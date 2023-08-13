const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/welcome', (req, res, next) => {
    if (studentController.isStudent(req, res)) {
        res.render('students/welcome');
    } else {
        res.status(403).send('Not authorized: ' + err.message);
    }
})

router.get('/quiz', studentController.ensureStudent, (req, res) =>{
    res.render('students/quiz');
})
router.get('/chat', studentController.ensureStudent, (req, res) =>{
    res.render('students/chatStudent');
})
router.get('/game', studentController.ensureStudent,(req,res) => {
    res.render('students/game');
})  
module.exports = router;