const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { createClient } = require('redis');
const app = express();
const PORT = 3000;

const MESSAGE = process.env.MESSAGE || 'Hello from Node.js!';

// Redis client setup
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'cache'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

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
    if (!redisClient.isReady) {
      throw new Error('Redis client not ready');
    }

    const cachedItems = await redisClient.get('items');
    if (cachedItems) {
      return res.json(JSON.parse(cachedItems));
    }

    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    const items = result.rows;

    await redisClient.set('items', JSON.stringify(items), {EX: 60});

    res.json(items);

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
      if (redisClient.isReady) {
        await redisClient.del('items');
      }
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

process.on('SIGINT', async () => {
  await redisClient.quit();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await redisClient.quit();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
