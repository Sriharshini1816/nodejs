// models/User.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  education: String,
  interests: [String],
  careerGoals: [String],
  skills: [String],
  progress: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  passwordHash: { type: String }, // hashed password if using local auth
  provider: { type: String, default: 'local' }, // google/github/linkedin
  providerId: String,
  profile: ProfileSchema,
  saved: {
    careers: [String],
    courses: [String],
    universities: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
