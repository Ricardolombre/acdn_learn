require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());


// Importer les routes
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const userCourseRoutes = require('./routes/userCourseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const lessonReadRoutes = require('./routes/lessonReadRoutes');
const quizRoutes = require('./routes/quizRoutes');
const evaluationLessonRoutes = require('./routes/evaluationRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

app.use('/cours', courseRoutes);
app.use('/users', userRoutes);
app.use('/user-cours', userCourseRoutes);
app.use('/lessons', lessonRoutes);
app.use('/lessons-read', lessonReadRoutes);
app.use('/quizzes', quizRoutes);
app.use('/evaluations-lessons', evaluationLessonRoutes);
app.use('/resources', resourceRoutes);

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
