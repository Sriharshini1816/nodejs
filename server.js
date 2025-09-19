// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // ✅ add mongoose

const authRoutes = require('./auth');
const userRoutes = require('./users');
const resourceRoutes = require('./resources');
const alertRoutes = require('./alerts');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// health check
app.get('/', (req, res) => res.json({ ok: true, msg: 'Career Advisor API running' }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/alerts', alertRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on ${PORT}`);
});

