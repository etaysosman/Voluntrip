const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();
router.use(express.urlencoded({extended:false}));

//register
router.get('/register', usersController.getRegisterPage);
router.post('/register', usersController.registerUser);

//login
router.get('/login', usersController.getLoginPage);
router.post('/login', usersController.loginUser);


module.exports = router;
