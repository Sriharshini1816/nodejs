// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectMongo, pgPool } = require('./db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const resourceRoutes = require('./routes/resources');
const alertRoutes = require('./routes/alerts');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// connect db
connectMongo();

// health
app.get('/', (req, res) => res.json({ ok: true, msg: 'Career Advisor API running' }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/alerts', alertRoutes);

// Example endpoint that logs to Postgres (analytics)
app.post('/api/analytics/event', async (req, res) => {
  const { userId, eventType, meta } = req.body;
  try {
    const text = 'INSERT INTO events(user_id, event_type, meta) VALUES($1,$2,$3) RETURNING *';
    const values = [userId || null, eventType, JSON.stringify(meta || {})];
    const result = await pgPool.query(text, values);
    res.json({ ok: true, event: result.rows[0] });
  } catch (err) {
    console.error('analytics error', err);
    res.status(500).json({ ok: false, error: 'pg error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

