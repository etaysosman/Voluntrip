const Review = require('../models/review');

exports.getReviews = (req, res) => {
  res.render('reviews', {
    pageTitle: 'Reviews | VolunTrip',
    path: '/reviews'
  });
};

exports.postReview = (req, res) => {
  const {
    volunteerName,
    location,
    category,
    daysVolunteered,
    rating,
    description
  } = req.body;

  const review = new Review(
    volunteerName,
    location,
    category,
    rating,
    description,
    daysVolunteered
  );

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
