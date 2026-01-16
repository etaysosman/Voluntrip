// app.js
// app.js
const express = require('express');
const path = require('path');

const homeRoutes = require('./routes/home');
const activitiesRoutes = require('./routes/activities');
const reviewsRoutes = require('./routes/reviews');
const applyRoutes = require('./routes/apply');
const usersRoutes = require('./routes/users');

const app = express();

//Tell Express to use EJS
app.set('views', path.join(__dirname, 'views'));


// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false}));

// Static files (css, images) 
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(usersRoutes);
app.use(homeRoutes);
app.use(activitiesRoutes);
app.use(reviewsRoutes);
app.use(applyRoutes);



//always last - 404 page not found
app.use((req, res) => {
  res.status(404).render('file_not_found');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
