const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/all', courseController.getAllCourses);

router.get('/:id', courseController.getCourseById);

router.post('/add', courseController.addCourse);

router.put('/update/:id', courseController.updateCourse);

router.delete('/delete/:id', courseController.deleteCourse);

module.exports = router;
