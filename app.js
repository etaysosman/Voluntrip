const express = require('express');
const session = require('express-session');
const path = require('path');
const homeRoutes = require('./routes/home');
const reviewsRoutes = require('./routes/reviews');
const applyRoutes = require('./routes/apply');
const usersRoutes = require('./routes/users');

const app = express();

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    resave: false
}));

// Tell Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Static files (css, images, js, media) 
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use(usersRoutes);
app.use(homeRoutes);
app.use(reviewsRoutes);
app.use(applyRoutes); // this one contains 404 handeling

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});