const express = require('express');
const applyController = require('../controllers/apply');

// 1. ייבוא השומר
const isAuth = require('../util/is_auth');

const router = express.Router();

// 2. הוספת ההגנה לכל הפעולות של הרשמה ופעילות
router.post('/apply', isAuth, applyController.postApply);
router.get('/apply/:activityId', isAuth, applyController.getApplyForm);
router.post('/addActivity', isAuth, applyController.postAddActivity);

//always last - 404 page not found
router.use((req, res) => {
  res.status(404).render('file_not_found');
});

module.exports = router;

