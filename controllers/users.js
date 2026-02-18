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
    const { fullName, id, birthdate, email, username, password } = req.body;

    // 1. בדיקת תעודת זהות
    User.findById(id)
        .then(([idRows]) => {
            if (idRows.length > 0) {
                return res.render('register', {
                    errorMessage: 'User with this ID already exists'
                });
            }

            // 2. בדיקת אימייל (הוספנו את החלק הזה)
            return User.findByEmail(email)
                .then(([emailRows]) => {
                    if (emailRows.length > 0) {
                        return res.render('register', {
                            errorMessage: 'User with this Email already exists'
                        });
                    }

                    // 3. בדיקת שם משתמש
                    return User.findByUsername(username)
                        .then(([userRows]) => {
                            if (userRows.length > 0) {
                                return res.render('register', {
                                    errorMessage: 'User with this Username already exists'
                                });
                            }

                            // 4. אם הגענו לפה - הכל פנוי. מצפינים סיסמה ושומרים.
                            return bcrypt.hash(password, 12)
                                .then(hashedPassword => {
                                    const user = new User(
                                        fullName,
                                        id,
                                        birthdate,
                                        username,
                                        email,
                                        hashedPassword
                                    );
                                    return user.save();
                                })
                                .then(() => {
                                    res.redirect('/login');
                                });
                        });
                });
        })
        .catch(err => {
            console.log(err);
            res.render('register', {
                errorMessage: 'Something went wrong, please try again.'
            });
        });
};

exports.loginUser = (req, res) => {
    // ... (הקוד של הלוגין שלך נשאר זהה למה שסיכמנו קודם)
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

