const db = require('../config/db');

class Quiz {
    static getAllQuizzes(callback) {
        const query = `
            SELECT *
            FROM quiz
        `;
        db.query(query, (err, results) => {
            callback(err, results);
        });
    }

    static getQuizById(quizId, callback) {
        const query = `
            SELECT *
            FROM quiz
            WHERE id = ?
        `;
        db.query(query, [quizId], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null); // Aucun quiz trouvé
            callback(null, results[0]);
        });
    }

    static getQuizzesByLessonId(lessonId, callback) {
        const query = `
            SELECT q.id, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer
            FROM quiz q
            WHERE q.lesson_id = ?
        `;
        db.query(query, [lessonId], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }

    static getQuizIfNotEvaluated (lessonId, userId, callback) {
        const query = `
          SELECT q.*
          FROM quiz q
          JOIN lesson l ON q.lesson_id = l.id
          WHERE l.id = ?
            AND NOT EXISTS (
              SELECT 1
              FROM evaluation_lesson el
              WHERE el.lesson_id = l.id
                AND el.user_id = ?
            )
        `;
        db.query(query, [lessonId, userId], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        })
    };
}


module.exports = Quiz;