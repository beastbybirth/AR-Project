const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

const User = require('../models/user');

router.get('/welcome', (req, res, next) => {
    if (teacherController.isTeacher(req, res)) {
        res.render('teachers/welcome');
        console.log('redirecting')
    } else {
        res.send('Not authorized: ');
    }
})

router.get('/dashboard', teacherController.ensureTeacher,(req,res) => {
    res.render('teachers/dashboard');
})


router.get('/chat', teacherController.ensureTeacher,(req,res) => {
    res.render('teachers/chatTeacher');
})

router.get('/addstudents', teacherController.ensureTeacher,(req,res) => {
    res.render('teachers/addstudents');
})

router.get('/aman', teacherController.ensureTeacher,(req,res) => {
    res.render('teachers/aman');
})

router.post('/add-student',teacherController.ensureTeacher, async (req, res) =>{
    const {studentId} = req.body;
    console.log(req);
    console.log("req.body:  " + req.body);

    try{
        const student = await User.findOne({role: 'student', _id: studentId});
        console.log("Student found");
        if(!student) {
            return res.status(404).json({message: 'Student not found'});
        }

        const teacher = await User.findOne({role: 'teacher', _id: req.user._id});
        console.log("Teacher found");

        if(!teacher){
            return res.status(404).json({message: 'Teacher not found'});
        }
        const students = {
            [student.id]: {
                id: student.id,
                name: student.name,
            }
        };
        
        teacher.students = { ...teacher.students, ...students };
        await teacher.save();
        console.log("Teacher after adding student:", teacher); // Add this line

        res.status(200).json({message: 'Student added successfully'});
    } catch (error){
        res.status(500).json({message: 'An error ocurred'});
    }
})

router.get('/get-student',teacherController.ensureTeacher, async (req, res) => {
    const teacherId = req.user.id;
    try{
        const teacher = await User.findById(teacherId);
        console.log(teacher);
        if(!teacher){
            return res.status(404).json({message: 'Teacher not found'});
        }

        const students = Object.values(teacher.students);
        res.status(200).json(students);
    } catch (error){
        res.status(500).json({message: 'An error occurred'});
    }
})
module.exports = router;