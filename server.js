// Load environment variables unconditionally, as the very first thing 
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const contactRoutes = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Contacts API routes (Fixed base path to match Swagger and Render URL)
app.use('/api/contacts', contactRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

// Use the correct env variable name here
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Error: MONGODB_URI environment variable is not set.');
  process.exit(1);
}

// Connect to MongoDB then start the server
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
