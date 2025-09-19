// routes/alerts.js
const express = require('express');
const router = express.Router();
const Alert = require('./Alert');

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
router.get("/", (req, res) => {
  res.json([
    { id: 1, msg: "Application deadline Oct 10" },
    { id: 2, msg: "Scholarship essay due Nov 1" }
  ]);
});
module.exports = router;



