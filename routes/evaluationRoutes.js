const express = require('express');
const router = express.Router();
const evaluationLessonController = require('../controllers/evaluationLessonController');

router.get('/:userId/lesson/:lessonId', evaluationLessonController.getAllLessonEvaluationByUser);

router.post('/add', evaluationLessonController.addLessonEvaluation);

module.exports = router;