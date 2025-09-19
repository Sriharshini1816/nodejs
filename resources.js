// routes/resources.js
const express = require('express');
const router = express.Router();
const Resource = require('./Resource');

// list resources
router.get('/', async (req, res) => {
  try {
    const items = await Resource.find().sort({ createdAt: -1 }).limit(50);
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

// create resource (admin)
router.post('/', async (req, res) => {
  try {
    const r = new Resource(req.body);
    await r.save();
    res.json({ resource: r });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;


