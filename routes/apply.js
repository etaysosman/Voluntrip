const express = require('express');
const applyController = require('../controllers/apply');

// Import authentication middleware
const isAuth = require('../util/is_auth');

const router = express.Router();

// Protect application and activity routes with isAuth middleware
router.post('/apply', isAuth, applyController.postApply);
router.get('/apply/:activityId', isAuth, applyController.getApplyForm);
router.post('/addActivity', isAuth, applyController.postAddActivity);

// Fallback route for 404 errors 
router.use((req, res) => {
  res.status(404).render('file_not_found');
});

module.exports = router;