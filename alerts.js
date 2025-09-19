// routes/alerts.js
const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// list by user
router.get('/user/:userId', async (req, res) => {
  const alerts = await Alert.find({ userId: req.params.userId }).sort({ dueDate: 1 });
  res.json({ alerts });
});

// create
router.post('/', async (req, res) => {
  const a = new Alert(req.body);
  await a.save();
  res.json({ alert: a });
});

module.exports = router;
