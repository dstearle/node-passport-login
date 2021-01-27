module.exports = {
    
    // Checks to see that the user has logged in before entering dashboard
    ensureAuthenticated: function(req, res, next) {

        // If user has been authenticated then allow them to proceed to the dashboard
        if (req.isAuthenticated()) {

            return next();

        }

        // Displays error message to user if they have not been authenticated but try to view the dashboard
        req.flash('error_msg', 'Please log in to view that resource');

        // Redirects the user back to the login
        res.redirect('/users/login');

    }

};