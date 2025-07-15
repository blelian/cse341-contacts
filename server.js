// Load environment variables (only in non-production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const contactRoutes = require('./routes/contact');
const db = require('./database/connection');

const port = process.env.PORT || 3000;

app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Use contacts API routes
app.use('/contacts', contactRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

// ✅ Make sure the server listens
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
