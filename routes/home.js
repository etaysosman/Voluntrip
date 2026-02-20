const express = require('express');
const homeController = require('../controllers/home');
const connectController = require('../controllers/connect');

// Import the authentication middleware
const isAuth = require('../util/is_auth'); 

const router = express.Router();

// Public pages (accessible to everyone)
router.get('/', homeController.getStart);
router.get('/about', isAuth, homeController.getAbout);

// Adding isAuth to routes that require authentication
router.get('/home', isAuth, homeController.getHome);

router.get('/explore', isAuth, homeController.getExplore);
router.post('/explore', isAuth, homeController.postExplore);

router.get('/connect', isAuth, connectController.getConnect);
router.post('/connect', isAuth, connectController.postConnect);

module.exports = router;