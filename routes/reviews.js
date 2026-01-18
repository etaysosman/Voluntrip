const express = require('express');
const reviewsController = require('../controllers/reviews');

const router = express.Router();

router.get('/reviews', reviewsController.getReviews);
router.post('/reviews', reviewsController.postReview);

module.exports = router;
