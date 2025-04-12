const LessonRead = require('../models/lessonReadModel');

exports.getAllLessonsReadByUser = (req, res) => {
    const {userId, courseId}  = req.params;

    LessonRead.getAllLessonsReadByUser(userId, courseId, (err, lessonReads) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(lessonReads);
    });
}

exports.addLessonRead = (req, res) => {
    const { userId, lessonId, courseId } = req.body;

    LessonRead.addLessonRead(userId, lessonId, courseId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Leçon marquée comme lue avec succès' });
    });
}

exports.deleteLessonRead = (req, res) => {
    const { userId, lessonId, courseId } = req.params;

    LessonRead.deleteLessonRead(userId, lessonId, courseId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Leçon supprimée avec succès' });
    });
}