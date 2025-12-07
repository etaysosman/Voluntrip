const path = require('path');
const Apply = require('../models/apply');

exports.getApplyForm = (req, res) => {
    const activityId = req.params.id;
    console.log('Apply for activity:', activityId);
    res.sendFile(path.join(__dirname, '../views/apply.html'));
};

exports.saveApplication = (req, res) => {
    const application = new Apply(
        req.body.fullName,
        req.body.email,
        req.body.phone,
        req.body.experience,
        req.body.activityId
    );

    application.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};