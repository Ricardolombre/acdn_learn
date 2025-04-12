const db = require('../config/db');

class LessonReadModel {
    static getAllLessonsReadByUser(userId, courseId, callback) {
        const query = `
            SELECT *
            FROM lesson_read
            WHERE user_id = ? AND course_id = ?
        `;
        db.query(query, [userId, courseId], callback);
    }

    static addLessonRead(userId, lessonId, courseId, callback) {
        const query = `
            INSERT INTO lesson_read (user_id, lesson_id, course_id, isFinished) 
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [userId, lessonId, courseId, true], callback);
    }

    static deleteLessonRead(userId, lessonId, courseId, callback) {
        const query = `
            DELETE FROM lesson_read 
            WHERE user_id = ? AND lesson_id = ? AND course_id = ?
        `;
        db.query(query, [userId, lessonId, courseId], callback);
    }
}

module.exports = LessonReadModel;