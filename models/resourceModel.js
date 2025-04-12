const db = require('../config/db');

class ResourceModel {
    static getAll(callback) {
        const query = 'SELECT * FROM resources';
        db.query(query, (err, results) => {
            callback(err, results);
        });
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM resources';
        db.query(query, [id], (err, results) => {
            callback(err, results);
        });
    }

    static create(title, description, date, type, category, download_url, external_url, callback) {
        console.log(date);
        const query = 'INSERT INTO resources (title, description, date, type, category, download_url, external_url) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [title, description, date, type, category, download_url, external_url], (err, result) => {
            callback(err, result);
        });
    }

    static deleteResource(id, callback) {
        const query = 'DELETE FROM resources WHERE id = ?';
        db.query(query, [id], (err, result) => {
            callback(err, result);
        });
    }

    static updateResource(id, title, description, date, type, category, download_url, external_url, callback) {
        console.log(date);
        if (!download_url) {
            const query = 'UPDATE resources SET title = ?, description = ?, date = ?, type = ?, category = ?, external_url = ? WHERE id = ?';
            db.query(query, [title, description, date, type, category, external_url, id], (err, result) => {
                callback(err, result);
            });
            return;
        }
        const query = 'UPDATE resources SET title = ?, description = ?, date = ?, type = ?, category = ?, download_url = ?, external_url = ? WHERE id = ?';
        db.query(query, [title, description, date, type, category, download_url, external_url, id], (err, result) => {
            callback(err, result);
        });
    }
}

module.exports = ResourceModel;