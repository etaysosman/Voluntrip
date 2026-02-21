// Middleware to protect routes: redirects to login if the user is not authenticated
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }

    // Proceed to the next middleware or route handler
    next();
};