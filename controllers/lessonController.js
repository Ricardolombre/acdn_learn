const Lesson = require('../models/lessonModel');

exports.getAllLessons = (req, res) => {
    Lesson.getAllLessons((err, lessons) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(lessons);
    });
};

exports.getLessonById = (req, res) => {
    const lessonId = req.params.id;
    Lesson.getLessonById(lessonId, (err, lesson) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
        res.json(lesson);
    });
};

exports.getLessonsByCourseId = (req, res) => {
    const courseId = req.params.courseId;
    Lesson.getLessonsByCourseId(courseId, (err, lessons) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(lessons);
    });
};

exports.addLesson = (req, res) => {
    const { title, description, courseId } = req.body;
    const video_url = req.file ? req.file.path : null; // Assuming you're using multer for file upload
    Lesson.addLesson(title, description, courseId, video_url, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Leçon créée avec succès', lessonId: result.insertId });
    });
};

exports.getLessonByIdAndCourseId = (req, res) => {
    const lessonId = req.params.lessonId;
    const courseId = req.params.courseId;
    Lesson.getLessonByIdAndCourseId(lessonId, courseId, (err, lesson) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
        res.json(lesson);
    });
}

exports.updateLesson = (req, res) => {
    const lessonId = req.params.id;
    const { title, description } = req.body;
    const video_url = req.file ? req.file.path : null; // Assuming you're using multer for file upload
    Lesson.updateLesson(lessonId, title, description, video_url, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Leçon non trouvée' });
        res.json({ message: 'Leçon mise à jour avec succès' });
    });
};

exports.deleteLesson = (req, res) => {
    const lessonId = req.params.id;
    Lesson.deleteLesson(lessonId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Leçon non trouvée' });
        res.json({ message: 'Leçon supprimée avec succès' });
    });
}

exports.debloqueLesson = (req, res) => {
    const lessonId = req.params.lessonId;
    Lesson.debloqueLesson(lessonId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Leçon débloquée avec succès' });
    });
}

exports.bloqueLesson = (req, res) => {
    const lessonId = req.params.lessonId;
    Lesson.bloqueLesson(lessonId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Leçon bloquée avec succès' });
    });
}