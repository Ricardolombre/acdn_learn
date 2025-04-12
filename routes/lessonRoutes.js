const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const storage = require('../config/storage');
const multer = require('multer');

const upload = multer({ storage });

router.get('/all', lessonController.getAllLessons);

router.get('/:id', lessonController.getLessonById);

router.get('/course/:courseId', lessonController.getLessonsByCourseId);

router.post('/add', upload.single('video_url'), lessonController.addLesson);

router.put('/update/:id', upload.single('video_url'), lessonController.updateLesson);

router.get('/course/:courseId/lesson/:lessonId', lessonController.getLessonByIdAndCourseId);

router.delete('/delete/:id', lessonController.deleteLesson);

router.post('/debloque/:lessonId', lessonController.debloqueLesson);

router.post('/bloque/:lessonId', lessonController.bloqueLesson);

module.exports = router;