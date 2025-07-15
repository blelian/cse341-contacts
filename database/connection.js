// Load environment variables only in non-production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = { connectToDb };
