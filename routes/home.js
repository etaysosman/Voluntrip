const express = require('express');
const homeController = require('../controllers/home');
const connectController = require('../controllers/connect');
const router = express.Router();

router.get('/home', homeController.getHome);
router.get('/about', homeController.getAbout);
router.get('/explore', homeController.getExplore);
router.get('/reviews', homeController.getReviews);
router.get('/', homeController.getStart);
router.get('/connect', connectController.getConnect);

module.exports = router;