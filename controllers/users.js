const User = require('../models/users');
const bcrypt = require('bcryptjs');
// Renders the user registration page
exports.getRegisterPage = (req, res, next) => {
    res.render('register', {
        errorMessage: null
    });
};
// Renders the user login page
exports.getLoginPage = (req, res, next) => {
    res.render('login', {
        errorMessage: null
    });
};

// Handles user registration with validation and password hashing
exports.registerUser = (req, res) => {
    // Extract new user fields from the request body
    const { fullName, id, birthdate, email, username, password, country, gender } = req.body;

    User.findById(id)
        .then(([idRows]) => {
            if (idRows.length > 0) {
                // Throwing an error breaks the chain and jumps to the catch block
                throw new Error('User with this ID already exists');
            }
            return User.findByEmail(email);
        })
        .then(([emailRows]) => {
            if (emailRows && emailRows.length > 0) {
                throw new Error('User with this Email already exists');
            }
            return User.findByUsername(username);
        })
        .then(([userRows]) => {
            if (userRows && userRows.length > 0) {
                throw new Error('User with this Username already exists');
            }
            // All checks passed, proceed to hash the password
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            // Create a new User object with the hashed password
            const user = new User(
                fullName,
                id,
                birthdate,
                username,
                email,
                hashedPassword, // Use the encrypted password
                country,
                gender
            );
            return user.save();
        })
        .then(() => {
            // Registration successful, redirect to login page with success parameter
            res.redirect('/login?registrationSuccess=true');
        })
        .catch(err => {
            // Main catch block for handling all errors in the chain
            
            // Handle specific validation errors (duplicate user info)
            if (err.message === 'User with this ID already exists' || 
                err.message === 'User with this Email already exists' || 
                err.message === 'User with this Username already exists') {
                return res.render('register', { errorMessage: err.message });
            }
            
            // Handle unexpected database or server errors
            console.log("DB Error:", err);
            res.render('register', { errorMessage: 'Something went wrong, please try again.' });
        });
};
// Handles user authentication and session creation
exports.loginUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findByUsername(username)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.render('login', { errorMessage: 'Invalid username or password' });
            }
            const user = rows[0];

            // Compare entered password with the hashed password in DB
            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        // Passwords match, set up user session
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            res.redirect('/home');
                        });
                    }
                    // Passwords don't match
                    res.render('login', { errorMessage: 'Invalid username or password' });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

// Destroys the user session and logs them out
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

