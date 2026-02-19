const express = require('express');
const reviewsController = require('../controllers/reviews');

// Import the authentication guard (middleware)
const isAuth = require('../util/is_auth');

const router = express.Router();

// Apply the protection middleware to the routes 
router.get('/reviews', isAuth, reviewsController.getReviews);
router.post('/reviews', isAuth, reviewsController.postReview);

module.exports = router;