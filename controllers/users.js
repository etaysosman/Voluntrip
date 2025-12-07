const path = require('path');
const User = require('../models/users');

exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
};

exports.registerUser = (req, res) => {
    const user = new User(
        req.body.username,   // ← זה תואם למודל
        req.body.email,
        req.body.password
    );

    user.save()
        .then(() => {
            res.redirect('/login'); 
        })
        .catch(err => console.log(err));
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.send('User not found');
            }

            const user = rows[0];

            if (user.password !== password) {
                return res.send('Incorrect password');
            }

            res.redirect('/'); // בהמשך נחליף ל־Dashboard
        })
        .catch(err => console.log(err));
};