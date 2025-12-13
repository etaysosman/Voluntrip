const express = require('express');
const activitiesController = require('../controllers/activities');
const router = express.Router();


router.get('/activities', activitiesController.getActivities);
router.get('/activities/:id', activitiesController.getActivityDetails);

module.exports = router;