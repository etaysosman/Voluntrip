const express = require('express');
const applyController = require('../controllers/apply');

const router = express.Router();

router.get('/apply/:id', applyController.getApplyForm);
router.post('/save-apply', applyController.saveApplication);

module.exports = router;