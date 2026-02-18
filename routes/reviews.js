const express = require('express');
const reviewsController = require('../controllers/reviews');

// 1. ייבוא השומר
const isAuth = require('../util/is_auth');

const router = express.Router();

// 2. הוספת ההגנה לנתיבים
router.get('/reviews', isAuth, reviewsController.getReviews);
router.post('/reviews', isAuth, reviewsController.postReview);

module.exports = router;