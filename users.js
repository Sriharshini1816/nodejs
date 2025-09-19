// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('./User');
const fetch = require('node-fetch');

// get user (simple)
router.get('/:id', async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select('-passwordHash');
    if (!u) return res.status(404).json({ msg: 'User not found' });
    res.json({ user: u });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

// update profile
router.put('/:id/profile', async (req, res) => {
  try {
    const update = req.body;
    const u = await User.findByIdAndUpdate(req.params.id, { $set: { profile: update } }, { new: true }).select('-passwordHash');
    res.json({ user: u });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

// proxy to recommender microservice
router.get('/:id/recommendations', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // call recommender service
    const resp = await fetch(`${process.env.RECOMMENDER_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: user.profile, userId: user._id })
    });
    const json = await resp.json();
    res.json(json);
  } catch (err) {
    console.error('recommendation error', err);
    res.status(500).json({ ok: false, err: 'recommendation service error' });
  }
});

module.exports = router;


