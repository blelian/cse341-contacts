const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  favoriteColor: { type: String, required: true, trim: true },
  birthday: { type: String, required: true }
}, { timestamps: true }); // optional: adds createdAt and updatedAt

module.exports = mongoose.model('Contact', contactSchema);
