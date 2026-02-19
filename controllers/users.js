const User = require('../models/users');
const bcrypt = require('bcryptjs');

exports.getRegisterPage = (req, res, next) => {
    res.render('register', {
        errorMessage: null
    });
};

exports.getLoginPage = (req, res, next) => {
    res.render('login', {
        errorMessage: null
    });
};

// --- מימוש פונקציית הרישום לפי המצגת (Promise Chaining) ---
exports.registerUser = (req, res) => {
    // 1. חילוץ השדות החדשים מתוך ה-body
    const { fullName, id, birthdate, email, username, password, country, gender } = req.body;

    User.findById(id)
        .then(([idRows]) => {
            if (idRows.length > 0) {
                return res.render('register', { errorMessage: 'User with this ID already exists' });
            }

            return User.findByEmail(email);
        })
        .then(([emailRows]) => {
            if (emailRows && emailRows.length > 0) {
                return res.render('register', { errorMessage: 'User with this Email already exists' });
            }
            return User.findByUsername(username);
        })
        .then(([userRows]) => {
            if (userRows && userRows.length > 0) {
                return res.render('register', { errorMessage: 'User with this Username already exists' });
            }

            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            // 2. יצירת המשתמש עם country ו-gender
            const user = new User(
                fullName,
                id,
                birthdate,
                username,
                email,
                hashedPassword,
                country,
                gender
            );
            return user.save();
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.render('register', { errorMessage: 'Something went wrong, please try again.' });
        });
};

exports.loginUser = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    User.findByUsername(username)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.render('login', { errorMessage: 'Invalid username or password' });
            }
            const user = rows[0];
            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            res.redirect('/home');
                        });
                    }
                    res.render('login', { errorMessage: 'Invalid username or password' });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

