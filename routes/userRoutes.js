const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const storage = require('../config/storage');
const multer = require('multer');

const upload = multer({ storage });

// Route pour récupérer tous les utilisateurs
router.get('/all', userController.getAllUsers);

// Route pour l'inscription
router.post('/signup', upload.single("avatar"), userController.signUp);

// Route pour la connexion
router.post('/login', userController.login);

module.exports = router;
