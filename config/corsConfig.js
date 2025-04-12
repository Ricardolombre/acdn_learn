const cors = require('cors');

// Configuration CORS
const corsOptions = {
    origin: 'http://localhost:8080',  // Remplace par l'URL de ton frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
