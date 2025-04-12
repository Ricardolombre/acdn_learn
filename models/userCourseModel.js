const db = require("../config/db");

class UserCourse {
    static getCoursesByUserId(userId) {
        return new Promise((resolve, reject) => {
          const query = `
            SELECT c.id, c.title, c.description, c.category, c.level, c.duration, c.instructor_name AS instructor, uc.isFinished
            FROM user_course uc
            JOIN course c ON uc.course_id = c.id
            WHERE uc.user_id = ?
          `;
          db.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
    }

    static getAllUserCourses() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM user_course`;
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static getUsersByCourseId(courseId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.id, u.name, u.email, u.role, u.avatar, uc.isFinished
                FROM user_course uc
                JOIN users u ON uc.user_id = u.id
                WHERE uc.course_id = ?
            `;
            db.query(query, [courseId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static isUserEnrolled(userId, courseId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT COUNT(*) AS count
                FROM user_course
                WHERE user_id = ? AND course_id = ?
            `;
            db.query(query, [userId, courseId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0].count > 0); // Renvoie true si l'utilisateur est inscrit au cours
            });
        });
    }
      

    static addUserCourse(userId, courseId) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO user_course (user_id, course_id) VALUES (?, ?)`;
            db.query(query, [userId, courseId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = UserCourse;