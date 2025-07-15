require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const contactRoutes = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3000;

// Verify MongoDB connection string
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI environment variable is not set.');
  process.exit(1);
}

// Middleware
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Contacts routes
app.use('/api/contacts', contactRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

// Connect MongoDB and start server
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected.');
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
