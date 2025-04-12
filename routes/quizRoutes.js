const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/all', quizController.getAllQuizzes);

router.get('/:id', quizController.getQuizById);

router.get('/lesson/:lessonId', quizController.getQuizzesByLessonId);

router.get('/lesson/:lessonId/user/:userId', quizController.getQuizIfNotEvaluated);

module.exports = router;