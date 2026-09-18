const http = require('http');
const url = require('url');

// Future Redis integration: Uncomment and use when Redis is required
// const { createClient } = require('redis');
// const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
// const REDIS_RETRY_DELAY_MS = parseInt(process.env.REDIS_RETRY_DELAY_MS) || 1000;
// const REDIS_MAX_RETRIES = parseInt(process.env.REDIS_MAX_RETRIES) || 5;

const PORT = 3000;

// Future Redis connection logic with retry and fallback
// async function connectRedis() {
//     const redisClient = createClient({ url: REDIS_URL });
//     let retries = 0;
//     let delay = REDIS_RETRY_DELAY_MS;
// 
//     redisClient.on('error', async (err) => {
//         if (retries < REDIS_MAX_RETRIES) {
//             retries++;
//             delay = delay * 2 * (1 + Math.random() * 0.1); // Exponential backoff with jitter
//             console.error(`Redis connection error: ${err.message}. Retrying in ${delay}ms...`);
//             await new Promise(resolve => setTimeout(resolve, delay));
//             await connectRedis();
//         } else {
//             console.error('Max Redis retries reached. Falling back to local cache or alternative storage.');
//         }
//     });
// 
//     await redisClient.connect();
//     console.log('Connected to Redis');
//     return redisClient;
// }

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'POST' && reqUrl.pathname === '/api/webhooks/payments') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
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

                console.log(`[PAYMENT WEBHOOK] Received payment notification: ${JSON.stringify(payload)}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success' }));
            } catch (error) {
                console.error('Error processing webhook:', error);

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

server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    
    // Future Redis connection initialization
    // try {
    //     const redisClient = await connectRedis();
    //     // Use redisClient for caching, sessions, or other Redis operations
    // } catch (err) {
    //     console.error('Failed to connect to Redis:', err);
    // }
});