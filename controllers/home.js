    const path = require('path');

    exports.getHome = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/welcome.html'));
    };

    exports.getAbout = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/about.html'));
    };

    exports.getExplore = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/explore.html'));
    }
    exports.getStart = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    }