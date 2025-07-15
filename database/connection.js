// Load environment variables only in non-production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { MongoClient } = require('mongodb');

// Use MONGODB_URI set in environment (Render) or .env (locally)
const uri = process.env.MONGODB_URI;

let db;

const connectToDb = (callback) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      // client.db() picks the database from the URI
      db = client.db();
      console.log('✅ Connected to MongoDB');
      callback();
    })
    .catch(err => {
      console.error('❌ Failed to connect to MongoDB:', err);
    });
};

const getDb = () => db;

module.exports = { connectToDb, getDb };
