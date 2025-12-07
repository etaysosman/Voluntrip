const path = require('path');

exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

exports.getAbout = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
};