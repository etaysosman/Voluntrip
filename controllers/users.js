const path = require('path');
const User = require('../models/users');
//const bcrypt = require('bcryptjs');

exports.getRegisterPage = (req, res, next) => {
    res.render('register', { //need to send error parameter {'error':""}
    });
};

exports.getLoginPage = (req, res, next) => {
    res.render('login', {
    });
};

/*
exports.registerUser = (req, res) => {
            res.redirect('/login'); 
} 
*/


exports.registerUser = (req, res) => {
    const user = new User(
        req.body.name, 
        req.body.surname,
        req.body.birthdate,
        req.body.email,
        req.body.username,
        req.body.password
    );

    user.save()

        .then(() => {
            res.redirect('/login'); 
        })
        .catch(err => console.log(err));
};


exports.loginUser = (req, res) => {
            res.render('home');
        }      
/*
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

            res.redirect('/home'); 
        })
        .catch(err => console.log(err));

      
};
*/