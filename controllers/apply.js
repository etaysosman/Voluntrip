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

exports.postApply = (req, res, next) => {
    // משיכת השדות החדשים מהטופס
    const activityId = req.body.activityId;
    const userId = req.body.userId; 
    const startDate = req.body.startDate;
    const durationWeeks = req.body.durationWeeks;
    const additionalLanguage = req.body.additionalLanguage;
    const physicalWork = req.body.physicalWork;
    const experience = req.body.experience;
    const agreeToTerms = req.body.agreeToTerms ? 1 : 0;

    // יצירת אובייקט Application חדש לפי הסדר של המודל
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

exports.postAddActivity = (req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const location = req.body.location;
    const organizer = req.body.organizer;
    const daysDuration = req.body.daysDuration;
    const socialLink = req.body.socialLink;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const activity = new Activity(null, title, category, location, organizer, daysDuration, socialLink, description, imageUrl);

    activity.save()
        .then(() => {
            res.redirect('/explore');
        })
        .catch(err => console.log(err));
};