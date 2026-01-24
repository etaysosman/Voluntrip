const express = require('express');
const applyController = require('../controllers/apply');

const router = express.Router();

router.get('/apply/:activityId', applyController.getApplyForm);
router.post('/apply', applyController.postApply);

//always last - 404 page not found
router.use((req, res) => {
  res.status(404).render('file_not_found');
});

module.exports = router;