import dotenv from 'dotenv';
import ioredis from 'ioredis';
import { OpenAI } from 'openai';
import { Langfuse } from 'langfuse';
import { z } from 'zod';
import readline from 'readline';

const Redis = ioredis;

// Load environment variables
dotenv.config();

// Validate environment variables
const envSchema = z.object({
  REDIS_URL: z.string().default('redis://cache-queue:6379'),
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_BASE_URL: z.string().min(1),
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
      `Approve (A) or Reject (R)? `,
      (answer) => {
        rl.close();
        const approved = answer.trim().toUpperCase() === 'A';
        log(`[HITL] Transaction ${transaction.orderId} ${approved ? 'approved' : 'rejected'}`);
        
        // Score the human decision for governance
        langfuse.score({
          traceId: transaction.orderId,
          name: 'gouvernance_hitl',
          value: approved ? 1 : 0,
          comment: `Human decision: ${approved ? 'approved' : 'rejected'}`,
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

const processTransaction = async (transaction) => {
  try {
    // Validate transaction data before sending to LLM
    const validatedTransaction = transactionSchema.parse(transaction);
    
    const payload = {
      model: 'gpt-4o',
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

// Graceful shutdown
process.on('SIGINT', async () => {
  log('Shutting down worker...');
  await redisClient.quit();
  await langfuse.shutdownAsync();
  process.exit(0);
});

// Start worker
main();
