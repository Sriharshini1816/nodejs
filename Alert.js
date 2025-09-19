// models/Alert.js
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  message: String,
  dueDate: Date,
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', AlertSchema);
