const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
    static getAllUsers(callback) {
        const query = 'SELECT id, name, email, role, avatar, created_at FROM users';
        db.query(query, (err, results) => {
            callback(err, results);
        });
    }

    static signUp(name, email, password, role, avatar, callback) {
        const hashedPassword = bcrypt.hashSync(password, 10);  // Hashage du mot de passe
        const query = 'INSERT INTO users (name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, email, hashedPassword, role, avatar], (err, result) => {
            callback(err, result);
        });
    }

    static login(email, password, callback) {
        const query = 'SELECT id, name, email, password, role, avatar, created_at FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return callback(err, null);

            if (results.length === 0) return callback(new Error('Utilisateur non trouvé'), null);

            const user = results[0];
            // Vérification du mot de passe
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return callback(err, null);
                if (!isMatch) return callback(new Error('Mot de passe incorrect'), null);

                // Générer un JWT
                const token = jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email, avatar: user.avatar, created_at: user.created_at  }, process.env.JWT_SECRET, { expiresIn: '1h' });
                
                callback(null, { token });
            });
        });
    }
}

module.exports = User;
