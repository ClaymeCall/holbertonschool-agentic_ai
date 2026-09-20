import dotenv from 'dotenv';
import ioredis from 'ioredis';
import { OpenAI } from 'openai';
import { Langfuse } from 'langfuse';
import { z } from 'zod';
import { createInterface } from 'readline/promises';
import readline from 'readline';

const Redis = ioredis;

// Load environment variables
dotenv.config();

// Validate environment variables
const envSchema = z.object({
  REDIS_URL: z.string().default('redis://cache-queue:6379'),
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_BASE_URL: z.string().min(1),
  OPENAI_MODEL: z.string().default('mistral-medium-latest'),
  LANGFUSE_PUBLIC_KEY: z.string().min(1),
  LANGFUSE_SECRET_KEY: z.string().min(1),
  LANGFUSE_BASEURL: z.string().default('https://cloud.langfuse.com'),
});

const env = envSchema.parse(process.env);

// Initialize clients
const redisClient = new Redis({
  host: env.REDIS_URL.split('//')[1].split(':')[0],
  port: parseInt(env.REDIS_URL.split(':')[2]),
});

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: env.OPENAI_BASE_URL,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

const langfuse = new Langfuse({
  publicKey: env.LANGFUSE_PUBLIC_KEY,
  secretKey: env.LANGFUSE_SECRET_KEY,
  baseUrl: env.LANGFUSE_BASEURL,
});

// Logger
const log = (message) => {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  console.log(`[${timestamp}] ${message}`);
};

// Human-in-the-Loop (HITL) validation
const hitlValidation = async (transaction, riskLevel, comment) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `[HITL] Transaction ${transaction.orderId} has risk level: ${riskLevel}. Comment: ${comment}\n` +
      `Autoriser (o) ou Refuser (n)? `,
      (answer) => {
        rl.close();
        const approved = answer.trim().toLowerCase() === 'o';
        log(`[HITL] Transaction ${transaction.orderId} ${approved ? 'autorisée' : 'refusée'}`);

        // Score the human decision for governance and attach to existing trace
        langfuse.score({
          traceId: transaction.orderId,
          name: 'gouvernance_hitl',
          value: approved ? 1 : 0,
          comment: `Décision humaine: ${approved ? 'autorisée' : 'refusée'}`,
        });

        resolve(approved);
      }
    );
  });
};

// Process transaction with LLM
const transactionSchema = z.object({
  orderId: z.string(),
  amount: z.number(),
  type: z.string(),
});

const refundPreHook = async (transaction) => {
  if (transaction.type !== 'refund') return true;

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = await rl.question(
      `[PRE-HOOK] Transaction ${transaction.orderId} is a refund. Continue? (o/n) `,
    );
    return answer.trim().toLowerCase() === 'o';
  } catch (err) {
    log(`[ERROR] Pre-hook failed: ${err.message}. Assuming no confirmation in Docker environment.`);
    return false;
  } finally {
    rl.close();
  }
};

const processTransaction = async (transaction) => {
  try {
    // Validate transaction data before sending to LLM
    const validatedTransaction = transactionSchema.parse(transaction);

    // Pre-hook for refunds
    const shouldContinue = await refundPreHook(validatedTransaction);
    if (!shouldContinue) {
      log(`[PRE-HOOK] Transaction ${transaction.orderId} cancelled by user.`);
      return { riskLevel: 'low', comment: 'Cancelled by pre-hook' };
    }

    const payload = {
      model: env.OPENAI_MODEL,
      response_format: {type: 'json_object'},
      messages: [
        {
          role: 'system',
          content: 'Analyze the following transaction for fraud detection. ' +
                   'Respond with a JSON object containing:\n' +
                   '- riskLevel: "low", "medium", or "high"\n' +
                   '- comment: string explaining the risk level',
        },
        {
          role: 'user',
          content: JSON.stringify(validatedTransaction),
        },
      ],
    };
    log(`[DEBUG] LLM Payload: ${JSON.stringify(payload)}`);

    const response = await openai.chat.completions.create(payload);

    const result = JSON.parse(response.choices[0].message.content);
    log(`[LLM] Transaction ${transaction.orderId} risk analysis: ${JSON.stringify(result)}`);

    // Trace the LLM call in Langfuse
    const trace = langfuse.trace({
      name: 'fraud_detection',
      id: transaction.orderId,
      input: transaction,
      output: result,
    });

    // Score the risk level for FinOps
    let riskScore;
    switch (result.riskLevel) {
      case 'high':
        riskScore = 1;
        break;
      case 'medium':
        riskScore = 0.5;
        break;
      case 'low':
        riskScore = 0;
        break;
      default:
        riskScore = 0.5;
    }

    trace.score({
      name: 'risk_score',
      value: riskScore,
      comment: `Risk level: ${result.riskLevel}`,
    });

    return result;
  } catch (err) {
    log(`[ERROR] LLM processing failed: ${err.message}. Details: ${JSON.stringify(err.response?.data || err)}`);
    throw err;
  }
};

// Worker loop
const processQueue = async () => {
  while (true) {
    try {
      const transaction = await redisClient.brpop('payment_queue', 0);
      if (!transaction) continue;

      const [, payload] = transaction;
      const transactionData = JSON.parse(payload);
      log(`Processing transaction: ${transactionData.orderId}`);

      // Process transaction with LLM
      const analysis = await processTransaction(transactionData);

      // Human-in-the-Loop validation for medium/high risk
      if (analysis.riskLevel === 'medium' || analysis.riskLevel === 'high') {
        const approved = await hitlValidation(transactionData, analysis.riskLevel, analysis.comment);
        if (!approved) {
          log(`[HITL] Transaction ${transactionData.orderId} rejected by human reviewer`);
          continue;
        }
      }

      log(`Transaction ${transactionData.orderId} processed successfully`);
    } catch (err) {
      log(`[ERROR] Error processing queue: ${err.message}`);
    }
  }
};

// Main
const main = async () => {
  try {
    log('Worker started');
    await processQueue();
  } catch (err) {
    log(`[ERROR] Fatal error: ${err.message}`);
    process.exit(1);
  }
};

// Graceful shutdown handler
async function safeExit(code = 0) {
  log('Shutting down worker...');
  await redisClient.quit();
  await langfuse.flushAsync();
  process.exit(code);
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await safeExit(0);
});

// Ensure Langfuse data is flushed on beforeExit
process.on('beforeExit', async () => {
  await langfuse.flushAsync();
});

// Start worker
main();
