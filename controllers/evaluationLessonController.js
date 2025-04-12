const e = require('express');
const EvaluationLesson = require('../models/evaluationLessonModel');

exports.getAllLessonEvaluationByUser = (req, res) => {
    const { userId, lessonId } = req.params;

    EvaluationLesson.getAllLessonEvaluationByUser(userId, lessonId, (err, evaluations) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(evaluations);
    });
}

exports.addLessonEvaluation = (req, res) => {
    const { userId, lessonId, score } = req.body;

    if (!userId || !lessonId || score === undefined) {
        return res.status(400).json({ error: "Champs manquants." });
      }

    EvaluationLesson.addLessonEvaluation(userId, lessonId, score, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Évaluation de la leçon ajoutée avec succès' });
    });
}

