const express = require('express');
const applyController = require('../controllers/apply');

const router = express.Router();

router.get('/apply/:activityId', applyController.getApplyForm);
router.post('/apply', applyController.postApply);

module.exports = router;