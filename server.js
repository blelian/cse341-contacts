// Load environment variables
require('dotenv').config();

const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const contactRoutes = require('./routes/contact');  // ✅ renamed variable for clarity
const db = require('./database/connection');

const port = process.env.PORT || 3000;

app.use(express.json());

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Route group for contact endpoints
app.use('/api/contacts', contactRoutes); // matches Swagger prefix /api/contacts

// Optional base route
app.get('/', (req, res) => {
    res.send('Welcome to my Contact API');
});

// Start the server after DB connects
db.connectToDb(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
        console.log(`📘 API docs at http://localhost:${port}/api-docs`);
    });
});
