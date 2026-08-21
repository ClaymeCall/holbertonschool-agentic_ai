const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

const MESSAGE = process.env.MESSAGE || 'Hello from Node.js!';

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// API Endpoints
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/api/items', async (req, res) => {
  const item = req.body.item;
  if (item) {
    try {
      const result = await pool.query(
        'INSERT INTO items (content) VALUES ($1) RETURNING *',
        [item]
      );
      res.status(201).json({ message: 'Item added successfully', item: result.rows[0] });
    } catch (err) {
      console.error('Error adding item:', err);
      res.status(500).json({ error: 'Failed to add item' });
    }
  } else {
    res.status(400).json({ error: 'Item is required' });
  }
});

app.get('/', (req, res) => {
  res.send(MESSAGE);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
