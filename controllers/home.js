    const path = require('path');
    const Review = require('../models/review');
    const Activity = require('../models/activity');
    const Apply = require('../models/apply');


        exports.getHome = (req, res) => {
            res.render('home');
        }

        exports.getReviews = (req, res) => {
            res.render('reviews');
        }

        exports.getStart = (req, res) => {
            res.render('index');
            
        }

        // GET: /explore
           exports.getExplore = (req, res, next) => {
                let activities;

                // Fetching all activities
                Activity.fetchAll()
                    .then(([rows]) => {
                        activities = rows;
                        return Apply.fetchTotalCount(); //returning total number af applications
                    })
                    .then(([countResult]) => {
                        const totalApps = countResult[0].total;

                        res.render('explore', {
                            activities: activities,
                            isFiltered: false,
                            totalApplications: totalApps // Passing to the VIEW
                        });
                    })
                    .catch(err => console.log(err));
            };

        // POST: /explore (filter)
        exports.postExplore = (req, res, next) => {
            const filters = {
                category: req.body.category,
                location: req.body.location
            };

            let activities;

            Activity.filter(filters)
                .then(([rows]) => {
                    activities = rows;
                    return Apply.fetchTotalCount();
                })
                .then(([countResult]) => {
                    const totalApps = countResult[0].total;

                    res.render('explore', {
                        activities: activities,
                        isFiltered: true,
                        totalApplications: totalApps // Passing Again
                    });
                })
                .catch(err => console.log(err));
        };

    


    exports.getAbout = (req, res) => {
        Review.fetchLatest()
            .then(([rows]) => {
            res.render('about', {
                reviews: rows
            });
            })
            .catch(err => {
            console.log(err);
            res.render('about', {
                reviews: []
            });
            });
        };









    // move to routers and delete from here
    // devide view with folders 