const Quiz = require('../models/quizModel');

exports.getAllQuizzes = (req, res) => {
    Quiz.getAllQuizzes((err, quizzes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(quizzes);
    });
}

exports.getQuizById = (req, res) => {
    const quizId = req.params.id;
    Quiz.getQuizById(quizId, (err, quiz) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!quiz) return res.status(404).json({ error: 'Quiz non trouvé' });
        res.json(quiz);
    });
};

exports.getQuizzesByLessonId = (req, res) => {
    const lessonId = req.params.lessonId;
    Quiz.getQuizzesByLessonId(lessonId, (err, quizzes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(quizzes);
    });
}

exports.getQuizIfNotEvaluated = (req, res) => {
    const { lessonId, userId } = req.params;
    Quiz.getQuizIfNotEvaluated(lessonId, userId, (err, quizzes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(quizzes);
    });
}
