const db = require('../config/db');

class Lesson {
    static getAllLessons(callback) {
        const query = `SELECT * FROM lesson`;
        db.query(query, callback);
    }

    static getLessonById(lessonId, callback) {
        const query = `SELECT * FROM lesson WHERE id = ?`;
        db.query(query, [lessonId], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length ? results[0] : null);
        });
    }

    static getLessonsByCourseId(courseId, callback) {
        const query = `
            SELECT * 
            FROM lesson 
            WHERE course_id = ?
        `;
        db.query(query, [courseId], callback);
    }

    static addLesson(title, description, courseId, video_url, callback) {
        const query = `
            INSERT INTO lesson (title, description, course_id, video_url) 
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [title, description, courseId, video_url], callback);
    }

    static markedAsFinished(lessonId, userId, callback) {
        const query = `
            INSERT INTO user_lesson (user_id, lesson_id, is_finished) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [userId, lessonId, true], callback);
    }

    static getLessonByIdAndCourseId(lessonId, courseId, callback) {
        const query = `
            SELECT * 
            FROM lesson 
            WHERE id = ? AND course_id = ?
        `;
        db.query(query, [lessonId, courseId], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length ? results[0] : null);
        });
    }

    static updateLesson(lessonId, title, description, video_url, callback) {
        if (!video_url) {
            const query = `
                UPDATE lesson 
                SET title = ?, description = ? 
                WHERE id = ?
            `;
            db.query(query, [title, description, lessonId], callback);
            return;
        }

        const query = `
            UPDATE lesson 
            SET title = ?, description = ?, video_url = ? 
            WHERE id = ?
        `;
        db.query(query, [title, description, video_url, lessonId], callback);
    }

    static deleteLesson(lessonId, callback) {
        const query = `DELETE FROM lesson WHERE id = ?`;
        db.query(query, [lessonId], callback);
    }

    static bloqueLesson(lessonId, callback) {
        const query = `
            UPDATE lesson
            SET isLocked = ? 
            WHERE id = ?
        `;
        db.query(query, [true, lessonId], callback);
    }

    static debloqueLesson(lessonId, callback) {
        const query = `
            UPDATE lesson
            SET isLocked = ? 
            WHERE id = ?
        `;
        db.query(query, [false, lessonId], callback);
    }
}

module.exports = Lesson;
