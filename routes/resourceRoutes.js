const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const storage = require('../config/storage');
const multer = require('multer');

const upload = multer({ storage });

// Route pour récupérer toutes les ressources
router.get('/all', resourceController.getAll);

// Route pour récupérer une ressource par son ID
router.get('/:id', resourceController.getById);

// Route pour créer une nouvelle ressource
router.post('/create', upload.single('download_url'), resourceController.create);

// Route pour mettre à jour une ressource
router.put('/update/:id', upload.single('download_url'), resourceController.updateResource);

// Route pour supprimer une ressource
router.delete('/delete/:id', resourceController.deleteResource);

module.exports = router;