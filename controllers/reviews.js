const Review = require('../models/review');
// Renders the reviews page
exports.getReviews = (req, res) => {
  res.render('reviews', {
    pageTitle: 'Reviews | VolunTrip',
    path: '/reviews'
  });
};
// Handles the submission and saving of a new user review
exports.postReview = (req, res) => {
  // Destructure review fields from the request body
  const {
    volunteerName,
    location,
    category,
    daysVolunteered,
    rating,
    description
  } = req.body;
  // Create a new Review object
  const review = new Review(
    volunteerName,
    location,
    category,
    rating,
    description,
    daysVolunteered
  );
  // Save the review to the database
  review.save()
    .then(() => {
      console.log('Review sent');
      res.redirect('/home');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error while saving review');
    });
};
