const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Logout route
router.get('/logout', authController.logout);

router.get('/login',(req,res)=>{
    res.render('login');
} )


// Login route
router.post('/login', authController.login,async (req, res) => {});

// Protected route example
router.get('/profile', authController.ensureAuthenticated, authController.profile);

module.exports = router;