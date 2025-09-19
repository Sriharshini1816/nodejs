// config/db.js
const mongoose = require('mongoose');
const { Pool } = require('pg');
require('dotenv').config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};

// Postgres pool for analytics / relational data
const pgPool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

pgPool.on('error', (err) => {
  console.error('Unexpected PG error', err);
});

module.exports = { connectMongo, pgPool };
