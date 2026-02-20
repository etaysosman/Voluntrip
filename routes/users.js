const express = require('express');
const usersController = require('../controllers/users');

// Initialize Express router
const router = express.Router();

// Middleware to parse incoming URL-encoded form data
router.use(express.urlencoded({ extended: false }));

// Registration routes
router.get('/register', usersController.getRegisterPage);
router.post('/register', usersController.registerUser); 

// Login routes
router.get('/login', usersController.getLoginPage);
router.post('/login', usersController.loginUser);

// Logout route
router.post('/logout', usersController.postLogout);

module.exports = router;