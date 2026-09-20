import { z } from "zod";

const envSchema = z.object({
  REDIS_URL: z.string().url().optional(),
  REDIS_RETRY_DELAY_MS: z.string().regex(/^\d+$/).transform(Number).optional(),
  REDIS_MAX_RETRIES: z.string().regex(/^\d+$/).transform(Number).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  LANGFUSE_SECRET_KEY: z.string().min(1).optional(),
  LANGFUSE_PUBLIC_KEY: z.string().min(1).optional(),
});

export const validateEnv = () => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment variables");
  }
  return result.data;
};