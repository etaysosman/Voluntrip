    const path = require('path');

    exports.getHome = (req, res) => {
        res.render('welcome');
    };

    exports.getAbout = (req, res) => {
        res.render('about');
    };

    exports.getExplore = (req, res) => {
        res.render('explore');
    }
    exports.getStart = (req, res) => {
        res.render('index');
        
    }