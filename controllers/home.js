    const path = require('path');
    const Review = require('../models/review');
    const Activity = require('../models/activity');


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
            Activity.fetchAll()
                .then(([rows]) => {
                    res.render('explore', {
                        activities: rows,
                        isFiltered: false
                    });
                })
                .catch(err => console.log(err));
        };

        // POST: /explore (סינון)
        exports.postExplore = (req, res, next) => {
            const filters = {
                category: req.body.category,
                location: req.body.location
            };

                Activity.filter(filters)
                    .then(([rows]) => {
                        res.render('explore', {
                            activities: rows,
                            isFiltered: true // מציג כפתור "נקה סינון" 
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