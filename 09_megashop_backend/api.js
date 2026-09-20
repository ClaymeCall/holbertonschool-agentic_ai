import express from 'express';
import ioredis from 'ioredis';
import dotenv from 'dotenv';
import { z } from 'zod';

const Redis = ioredis;

// Load environment variables
dotenv.config();

// Validate environment variables
const envSchema = z.object({
  REDIS_URL: z.string().default('redis://cache-queue:6379'),
  PORT: z.string().default('3000'),
  OPENAI_API_KEY: z.string().min(1),
  LANGFUSE_PUBLIC_KEY: z.string().min(1),
  LANGFUSE_SECRET_KEY: z.string().min(1),
  LANGFUSE_BASEURL: z.string().default('https://cloud.langfuse.com'),
});

const env = envSchema.parse(process.env);

const app = express();
const port = env.PORT;

// Create Redis client
const redisClient = new Redis({
  host: env.REDIS_URL.split('//')[1].split(':')[0],
  port: parseInt(env.REDIS_URL.split(':')[2]),
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Webhook endpoint for payment notifications
app.post('/webhook/payment', async (req, res) => {
  const { orderId, amount, type } = req.body;

  if (!orderId || !amount || !type) {
    return res.status(400).json({ error: 'Missing required fields: orderId, amount, type' });
  }

  try {
    // Add transaction to Redis queue
    await redisClient.lpush('payment_queue', JSON.stringify(req.body));
    res.status(200).json({ message: 'Payment queued successfully' });
  } catch (err) {
    console.error('Error queuing payment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});