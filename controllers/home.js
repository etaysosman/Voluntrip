    const path = require('path');

    exports.getHome = (req, res) => {
        res.render('home');
    }

    exports.getAbout = (req, res) => {
        res.render('about');
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

    // move to routers and delete from here
    // devide view with folders 