const passport = require('passport')
const { initializingPassport, isAuthenticated } = require('../config/passport')


// Login route handler
const login = passport.authenticate('local', {
  failureRedirect: '/auth/login',
  successRedirect: '/welcome',
});

// Logout route handler
const logout = (req, res) => {
  req.logout();
  res.redirect('/auth/login');
};

// Protected route handler example
const profile = (req, res) => {
  // Access the authenticated user's data through req.user
  res.render('profile', { user: req.user });
};

// Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

module.exports = {
  login,
  logout,
  profile,
  ensureAuthenticated,
};
