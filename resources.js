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
// simple static resources
router.get("/", (req, res) => {
  res.json([
    { id: 1, title: "Resume Template", type: "download" },
    { id: 2, title: "Scholarship Guide", type: "article" }
  ]);
});
module.exports = router;



