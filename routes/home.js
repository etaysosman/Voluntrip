const express = require('express');
const homeController = require('../controllers/home');
const router = express.Router();

router.get('/welcome', homeController.getHome);
router.get('/about', homeController.getAbout);
router.get('/explore', homeController.getExplore);
router.get('/', homeController.getStart);

module.exports = router;