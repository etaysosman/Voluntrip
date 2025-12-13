const Activity = require('../models/activities');
const path = require('path');

exports.getActivities = (req, res, next) => {
       res.redirect('/explore');
}

/*
exports.getActivities = (req, res, next) => {
    Activity.fetchAll()
        .then(([rows]) => {
            console.log(rows); 
            res.sendFile(path.join(__dirname, '../views/explore.html'));
        })
        .catch(err => console.log(err));
};
*/

exports.getActivityDetails = (req, res) => {
         res.redirect('/activities/:id');

}

/*
exports.getActivityDetails = (req, res) => {
    const id = req.params.id;

    Activity.findById(id)
        .then(([rows]) => {
            res.sendFile(path.join(__dirname, '../views/activity_details.html'));
        })
        .catch(err => console.log(err));
};
*/