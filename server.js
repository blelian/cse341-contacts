// Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware to parse JSON
app.use(express.json());

// Validate MONGODB_URI
if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in .env file");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // Stop the server if DB fails
    });

// Define routes
const contacts = require('./routes/contacts');
app.use('/api/contacts', contacts);

// Basic test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
