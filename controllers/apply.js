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
                activity: activity[0],
                userId: req.session.user ? req.session.user.id : null 
            });
        })
        .catch(err => console.log(err));
};

//Handles the submission of the user's application form
exports.postApply = (req, res, next) => {
    // Extract application fields from the request bod
    const activityId = req.body.activityId;
    const userId = req.body.userId; 
    const startDate = req.body.startDate;
    const durationWeeks = req.body.durationWeeks;
    const additionalLanguage = req.body.additionalLanguage;
    const physicalWork = req.body.physicalWork;
    const experience = req.body.experience;
    const agreeToTerms = req.body.agreeToTerms ? 1 : 0;

    // Create a new Apply object based on the model's constructor order
    const application = new Apply(
        activityId, 
        userId, 
        startDate, 
        durationWeeks, 
        additionalLanguage, 
        physicalWork, 
        experience, 
        agreeToTerms
    );

    application.save()
        .then(() => {
            console.log('Application Saved Successfully');
            res.redirect('/explore');
        })
        .catch(err => {
            console.log("Error saving application:", err);
            res.status(500).send('Error saving application');
        });
};