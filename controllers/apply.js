const path = require('path');
const Apply = require('../models/apply');

exports.getApply = (req, res) => {
    res.render('apply');
};

/* in the future will enable passing activity ID to the apply form

 exports.getApplyForm = (req, res) => {
            const activityId = req.params.id;
            console.log('Apply for activity:', activityId);
            res.render('apply', { activityId: activityId });
        };

*/

   
exports.saveApplication = (req, res) => {
    const application = new Apply(
        req.body.fullName,
        req.body.email,
        req.body.phone,
        req.body.experience,
    );

    application.save()
        .then(() => {
            res.redirect('/explore');
        })
        .catch(err => console.log(err));
};
