const http = require('http');
const url = require('url');
require('dotenv').config();

// Validate environment variables
let env;
try {
  const { validateEnv } = require('./src/utils/validateEnv');
  env = validateEnv();
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exit(1);
}

const { createClient } = require('redis');
const REDIS_URL = env?.REDIS_URL || "redis://localhost:6379";
const REDIS_RETRY_DELAY_MS = env?.REDIS_RETRY_DELAY_MS || 1000;
const REDIS_MAX_RETRIES = env?.REDIS_MAX_RETRIES || 5;

const TRANSACTION_QUEUE = "transactions:queue";

// Initialize Redis client
const redisClient = createClient({ url: REDIS_URL });
redisClient.on('error', (err) => {
    console.error(`Redis error: ${err.message}`);
});

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error(`Failed to connect to Redis: ${err.message}`);
    }
})();

// Local fallback queue
let localQueue = [];

const PORT = 3000;

// Redis connection logic with retry and fallback
async function connectRedis() {
    const redisClient = createClient({ url: REDIS_URL });
    let retries = 0;
    let delay = REDIS_RETRY_DELAY_MS;
    let isConnected = false;

    redisClient.on('error', (err) => {
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        if (retries < REDIS_MAX_RETRIES) {
            retries++;
            delay = delay * 2 * (1 + Math.random() * 0.1); // Exponential backoff with jitter
            console.error(`[${timestamp}] Redis connection error: ${err.message}. Retrying in ${delay}ms...`);
            setTimeout(() => connectRedis(), delay);
        } else {
            console.error(`[${timestamp}] Max Redis retries reached. Falling back to local queue.`);
        }
    });

    try {
        await redisClient.connect();
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(`[${timestamp}] Connected to Redis`);
        isConnected = true;
    } catch (err) {
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.error(`[${timestamp}] Failed to connect to Redis: ${err.message}`);
        throw err;
    }

    return { redisClient, isConnected };
}

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'POST' && reqUrl.pathname === '/api/webhooks/payments') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            try {
                const payload = JSON.parse(body);
                const requiredFields = ['transaction_id', 'amount', 'currency', 'status', 'timestamp'];

                const missingFields = requiredFields.filter(field => !(field in payload));

                if (missingFields.length > 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        error: `Missing required fields: ${missingFields.join(', ')}`
                    }));
                    return;
                }

                const sanitizedPayload = {
                    transaction_id: payload.transaction_id,
                    amount: payload.amount,
                    currency: payload.currency,
                    status: payload.status,
                    timestamp: payload.timestamp
                };

                // Validate field types
                if (typeof payload.transaction_id !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Field "transaction_id" must be a string' }));
                    return;
                }
                if (typeof payload.amount !== 'number') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Field "amount" must be a number' }));
                    return;
                }
                if (typeof payload.currency !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Field "currency" must be a string' }));
                    return;
                }
                if (typeof payload.status !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Field "status" must be a string' }));
                    return;
                }
                if (isNaN(Date.parse(payload.timestamp))) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Field "timestamp" must be a valid date' }));
                    return;
                }

                const requestId = require('crypto').randomUUID();
                console.log(`[${timestamp}] [PAYMENT WEBHOOK] [RequestID: ${requestId}] Received payment notification: ${JSON.stringify(sanitizedPayload)}`);

                // Push to Redis queue
                try {
                    await redisClient.lPush(TRANSACTION_QUEUE, JSON.stringify(sanitizedPayload));
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'success' }));
                } catch (redisError) {
                    console.error(`[${timestamp}] Redis error: ${redisError.message}`);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal server error' }));
                    return;
                }
            } catch (error) {
                console.error(`[${timestamp}] Error processing webhook: ${error.message}`);

                if (error instanceof SyntaxError) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal server error' }));
                }
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

// Handle missing tasks.json gracefully
server.listen(PORT, async () => {
    const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log(`[${timestamp}] Server running on port ${PORT}`);
    
    // Redis connection initialization with fallback
    let redisClient;
    let isRedisConnected = false;
    try {
        const result = await connectRedis();
        redisClient = result.redisClient;
        isRedisConnected = result.isConnected;
    } catch (err) {
        console.error(`[${timestamp}] Failed to connect to Redis: ${err.message}`);
    }
});