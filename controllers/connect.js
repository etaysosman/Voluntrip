// Import the Connect model for database operations
const Connect = require('../models/connect');

// Fetch and display the latest connection suggestions
exports.getConnect = (req, res) => {
  // Retrieve latest suggestions from database
  Connect.fetchLatest()
    .then(([rows]) => {
      // Render the connect page with fetched suggestions
      res.render('connect', {
        suggestions: rows
      });
    })
    .catch(err => {
      // Handle errors gracefully by displaying empty suggestions
      console.log(err);
      res.render('connect', {
        suggestions: [],
      });
    });
};

// Handle submission of new connection suggestions
exports.postConnect = (req, res) => {
  // Convert checkbox value to boolean (1 for true, 0 for false)
  const volunteeredBefore = req.body.volunteeredBefore ? 1 : 0;

  // Create a new Connect suggestion instance with form data
  const suggestion = new Connect(
    req.body.orgName,
    req.body.contactPhone,
    req.body.socialLink || null,
    req.body.category,
    volunteeredBefore,
    req.body.details || null
  );

  // Save the suggestion to the database
  suggestion.save()
    .then(() => {
      // On success, log confirmation and redirect to connect page
      console.log("Suggestion Saved Successfully!");
      res.redirect('/connect'); 
    })
    .catch(err => {
      // Handle errors and return error response
      console.log("Error saving suggestion:", err);
      res.status(500).send('Server error during save');
    });
};