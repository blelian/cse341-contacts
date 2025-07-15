// Load environment variables at the very top
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const contactRoutes = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3000;

// Check for MongoDB URI
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI is not set in the environment variables.');
  process.exit(1);
}

// Middleware
app.use(express.json());

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Contacts API routes (matches Swagger `/api/contacts`)
app.use('/api/contacts', contactRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

// Connect to MongoDB and start server
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected successfully.');
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
