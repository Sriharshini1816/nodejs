// models/Resource.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  type: { type: String, enum: ['guide','template','video','story','other'], default: 'guide' },
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
