const express = require('express');
const router = express.Router();
const userCourseController = require('../controllers/userCourseController');

// Route pour récupérer les cours d'un utilisateur
router.get('/:userId/courses', userCourseController.getCoursesByUserId);

router.get('/all', userCourseController.getAllUserCourses);

// Route pour vérifier si un utilisateur est inscrit à un cours
router.get('/:userId/courses/:courseId/enrollment', userCourseController.isUserEnrolled);

// Route pour récupérer les utilisateurs inscrits à un cours
router.get('/course/:courseId/users', userCourseController.getUsersByCourseId);

// Route pour ajouter un cours à un utilisateur
router.post('/add', userCourseController.addCourseToUser);

module.exports = router;