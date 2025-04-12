const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(users);
    });
};

// Inscription d'un utilisateur
exports.signUp = (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    const avatar = req.file ? req.file.filename : null;

    User.signUp(name, email, password, role, avatar, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    });
};

// Connexion d'un utilisateur
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.login(email, password, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Connexion réussie', token: result.token });
    });
};