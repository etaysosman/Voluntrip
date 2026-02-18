const express = require('express');
const homeController = require('../controllers/home');
const connectController = require('../controllers/connect');

// 1. הוספת הייבוא של ה-Middleware
const isAuth = require('../util/is_auth'); 

const router = express.Router();

// דפים ציבוריים (פתוחים לכולם)
router.get('/', homeController.getStart);
router.get('/about',isAuth, homeController.getAbout);

// 2. הוספת isAuth לדפים שדורשים התחברות
router.get('/home', isAuth, homeController.getHome);

router.get('/explore', isAuth, homeController.getExplore);
router.post('/explore', isAuth, homeController.postExplore);

router.get('/connect', isAuth, connectController.getConnect);
router.post('/connect', isAuth, connectController.postConnect);

module.exports = router;