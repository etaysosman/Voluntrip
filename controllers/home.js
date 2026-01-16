    const path = require('path');
    const Review = require('../models/review');


    exports.getHome = (req, res) => {
        res.render('home');
    }

    exports.getExplore = (req, res) => {
        res.render('explore');
    }

    exports.getReviews = (req, res) => {
        res.render('reviews');
    }

    exports.getStart = (req, res) => {
        res.render('index');
        
    }

    
    //exports.getAbout = (req, res) => {
     //   res.render('about');
    //}

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