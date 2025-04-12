const Course = require('../models/courseModel');

exports.getAllCourses = (req, res) => {
    Course.getAllCourses((err, courses) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(courses);
    });
};

exports.getCourseById = (req, res) => {
    const courseId = req.params.id;
    Course.getCourseById(courseId, (err, course) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!course) return res.status(404).json({ error: 'Cours non trouvé' });
        res.json(course);
    });
};

exports.addCourse = (req, res) => {
    const { title, category, level, instructor_name, about_instructor, prerequisites, objectives, duration, description } = req.body;
    Course.addCourse(title, category, level, instructor_name, about_instructor, prerequisites, objectives, duration, description, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Cours ajouté avec succès', insertId: result.insertId });
    });
};

exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const { title, category, level, insctructor_name, about_insctructor, prerequisites, objectives, duration, description } = req.body;
    Course.updateCourse(title, category, level, insctructor_name, about_insctructor, prerequisites, objectives, duration, description, courseId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cours mis à jour avec succès' });
    });
};

exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;
    Course.deleteCourse(courseId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cours supprimé avec succès' });
    });
};