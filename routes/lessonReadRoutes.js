const express = require('express');
const router = express.Router();
const lessonReadController = require('../controllers/lessonReadController');
const { route } = require('./courseRoutes');

// Route pour récupérer toutes les leçons lues par un utilisateur
router.get('/by-user/:userId/:courseId', lessonReadController.getAllLessonsReadByUser);

router.post('/add', lessonReadController.addLessonRead);

router.delete('/:userId/:lessonId/:courseId', lessonReadController.deleteLessonRead);

module.exports = router;