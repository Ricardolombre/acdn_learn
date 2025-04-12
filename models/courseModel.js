const db = require('../config/db');

class Course {
    static getAllCourses(callback) {
        const query = `
            SELECT id, title, description, category, level, duration, instructor_name AS instructor, about_instructor, prerequisites, objectives
            FROM course
        `;
        db.query(query, (err, results) => {
            callback(err, results);
        });
    }

    static getCourseById(courseId, callback) {
        const query = `
            SELECT *
            FROM course 
            WHERE id = ?
        `;
        db.query(query, [courseId], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null); // Aucun cours trouvé
            callback(null, results[0]);
        });
    }

    static addCourse(title, category, level, instructor_name, about_instructor, prerequisites, objectives, duration, description, callback) {
        const query = `
            INSERT INTO course (title, category, level, instructor_name, about_instructor, prerequisites, objectives, duration, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [title, category, level, instructor_name, about_instructor, prerequisites, objectives, duration, description], (err, result) => {
            callback(err, result);
        });
    }

    static updateCourse(courseId, title, category, level, instructor_name, about_instructor, prerequisites, objectives, duration, description, callback) {
        const query = `
            UPDATE course
            SET title = ?, category = ?, level = ?, instructor_name = ?, about_instructor = ?, prerequisites = ?, objectives = ?, duration = ?, description = ?
            WHERE id = ?
        `;
        db.query(query, [courseId, title, category, level, instructor_name, about_instructor, prerequisites, objectives, duration, description], (err, result) => {
            callback(err, result);
        });
    }

    static deleteCourse(courseId, callback) {
        const query = `
            DELETE FROM course
            WHERE id = ?
        `;
        db.query(query, [courseId], (err, result) => {
            callback(err, result);
        });
    }
};

module.exports = Course;
