const Apply = require('../models/apply');
const Activity = require('../models/activity');

exports.getApplyForm = (req, res, next) => {
    const actId = req.params.activityId;
    Activity.findById(actId)
        .then(([activity]) => {
            if (!activity[0]) {
                return res.redirect('/explore');
            }
            res.render('apply', {
                activity: activity[0]
            });
        })
        .catch(err => console.log(err));
};

exports.postApply = (req, res, next) => {
    const activityId = req.body.activityId;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phone = req.body.phone;
    const experience = req.body.experience;
    const agreeToTerms = req.body.agreeToTerms ? 1 : 0;

    const application = new Apply(activityId, fullName, email, phone, experience, agreeToTerms);

    application.save()
        .then(() => {
            console.log('Application Saved');
            res.redirect('/explore');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error saving application');
        });
};