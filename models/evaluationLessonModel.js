const db = require('../config/db');

class EvaluationLesson {
    static getAllLessonEvaluationByUser(userId, lessonId, callback) {
        const query = `
            SELECT *
            FROM evaluation_lesson
            WHERE user_id = ? AND lesson_id = ?
        `;
        db.query(query, [userId, lessonId], callback);
    }

    static addLessonEvaluation(userId, lessonId, score, callback) {
        const query = `
            INSERT INTO evaluation_lesson (user_id, lesson_id, score) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [userId, lessonId, score], callback);
    }
}


module.exports = EvaluationLesson;