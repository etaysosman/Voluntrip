const express = require('express');
const homeController = require('../controllers/home');
const connectController = require('../controllers/connect');
const router = express.Router();

router.get('/', homeController.getStart);
router.get('/home', homeController.getHome);

router.get('/about', homeController.getAbout);

router.get('/explore', homeController.getExplore);
router.post('/explore', homeController.postExplore);

router.get('/reviews', homeController.getReviews);

router.get('/connect', connectController.getConnect);
router.post('/connect', connectController.postConnect);



module.exports = router;