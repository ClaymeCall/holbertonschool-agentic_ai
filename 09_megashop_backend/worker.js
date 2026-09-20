"use strict";

require('dotenv').config();
const { createClient } = require('redis');
const { OpenAI } = require('openai');
const { observeOpenAI } = require('@langfuse/openai');
const asyncRetry = require('async-retry');

// Configuration
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || process.env.LANGFUSE_BASE_URL || "https://api.openai.com/v1";
const LANGFUSE_SECRET_KEY = process.env.LANGFUSE_SECRET_KEY;
const LANGFUSE_PUBLIC_KEY = process.env.LANGFUSE_PUBLIC_KEY;
const TRANSACTION_QUEUE = "transactions:queue";
const REDIS_RETRY_DELAY_MS = parseInt(process.env.REDIS_RETRY_DELAY_MS || "1000");
const MAX_RETRY_ATTEMPTS = 5;
let isRedisAvailable = true;

// Initialize clients
const redisClient = createClient({ url: REDIS_URL });
const openai = observeOpenAI(
  new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL,
  }),
  {
    secretKey: LANGFUSE_SECRET_KEY,
    publicKey: LANGFUSE_PUBLIC_KEY,
    baseUrl: process.env.LANGFUSE_BASE_URL,
  }
);

// Logger
const log = (message) => {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  console.log(`[${timestamp}] ${message}`);
};

// Connect to Redis with retry
const connectRedis = async () => {
  try {
    await asyncRetry(
      async (bail) => {
        try {
          await redisClient.connect();
          log("Connected to Redis");
          isRedisAvailable = true;
        } catch (err) {
          isRedisAvailable = false;
          log(`Redis connection error: ${err.message}`);
          throw err;
        }
      },
      {
        retries: MAX_RETRY_ATTEMPTS,
        minTimeout: REDIS_RETRY_DELAY_MS,
        maxTimeout: REDIS_RETRY_DELAY_MS * 10,
        onRetry: (error, attempt) => {
          log(`Retry attempt ${attempt}/${MAX_RETRY_ATTEMPTS} for Redis connection: ${error.message}`);
        }
      }
    );
  } catch (err) {
    log(`Max retries (${MAX_RETRY_ATTEMPTS}) exceeded for Redis connection: ${err.message}`);
    bailOnRedisFailure(err);
    throw err;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
};

// Bail out and operate in degraded mode
const bailOnRedisFailure = (err) => {
  log(`Operating in degraded mode due to Redis unavailability: ${err.message}`);
  isRedisAvailable = false;
};

// Process transaction with LLM
const processTransaction = async (transaction) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Analyze the following transaction for fraud detection. Respond with a JSON object containing 'isFraud': boolean and 'reason': string."
        },
        {
          role: "user",
          content: JSON.stringify(transaction),
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    log(`LLM processing error: ${err.message}`);
    throw err;
  }
};

// Worker loop
const processQueue = async () => {
  try {
    if (!isRedisAvailable) {
      log("Redis unavailable. Operating in degraded mode. Retrying connection...");
      await new Promise(resolve => setTimeout(resolve, REDIS_RETRY_DELAY_MS));
      await connectRedis();
      setImmediate(processQueue);
      return;
    }

    const transaction = await redisClient.brPop(TRANSACTION_QUEUE, 0);
    if (!transaction) return;

    const transactionData = JSON.parse(transaction.element);
    log(`Processing transaction: ${transactionData.id}`);

    const analysis = await processTransaction(transactionData);
    log(`Analysis result for transaction ${transactionData.id}: ${JSON.stringify(analysis)}`);
  } catch (err) {
    log(`Error processing queue: ${err.message}`);
    isRedisAvailable = false;
  } finally {
    // Restart processing
    setImmediate(processQueue);
  }
};

// Main
const main = async () => {
  try {
    await connectRedis();
    log("Worker started");
    await processQueue();
  } catch (err) {
    log(`Fatal error: ${err.message}. Retrying...`);
    setTimeout(main, REDIS_RETRY_DELAY_MS);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  log("Shutting down worker...")
  await redisClient.quit();
  process.exit(0);
});

// Start worker
main();