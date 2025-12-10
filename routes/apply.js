const express = require('express');
const applyController = require('../controllers/apply');


const router = express.Router();


router.get('/apply', applyController.getApply);
router.post('/save-apply', applyController.saveApplication);
//router.get('/apply/:id', applyController.getApplyForm);

module.exports = router;