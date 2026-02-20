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
                // במקום res.render, אנחנו זורקים שגיאה עם הודעה מותאמת
                // זה יעצור את השרשרת ויקפוץ ישר ל-catch הראשי
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
            // הכל תקין, אפשר להצפין סיסמה
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            // 2. יצירת המשתמש
            // שימו לב לסדר המשתנים שתואם במדויק ל-Model
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
            // אם הגענו לכאן - השמירה הצליחה!
            res.redirect('/login');
        })
        .catch(err => {
            // זה ה-catch הראשי שתופס את כל השגיאות מהשרשרת
            
            // בודקים אם זו שגיאה יזומה שלנו (כפילות משתמש)
            if (err.message === 'User with this ID already exists' || 
                err.message === 'User with this Email already exists' || 
                err.message === 'User with this Username already exists') {
                return res.render('register', { errorMessage: err.message });
            }
            
            // אם זו שגיאה של ה-DB (כמו undefined או קריסת שרת)
            console.log("DB Error:", err);
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

