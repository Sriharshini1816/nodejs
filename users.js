const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ inline schema (no /models folder)
const ProfileSchema = new mongoose.Schema({
  education: String,
  interests: [String],
  careerGoals: [String],
  skills: [String],
  progress: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  provider: { type: String, default: "local" },
  providerId: String,
  profile: ProfileSchema,
  saved: {
    careers: [String],
    courses: [String],
    universities: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// ➕ Create user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
