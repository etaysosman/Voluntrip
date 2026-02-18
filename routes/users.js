const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();
router.use(express.urlencoded({extended:false}));


router.get('/register', usersController.getRegisterPage);
router.post('/register', usersController.registerUser); 

router.get('/login', usersController.getLoginPage);
router.post('/login', usersController.loginUser);

router.post('/logout', usersController.postLogout);

module.exports = router;