import { z } from "zod";

const baseEnvSchema = z.object({
  DATABASE_URL: z.string().url().or(z.string().startsWith("postgresql://")),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  APPLICATION_ENCRYPTION_KEY: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
  PAYSTACK_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: z.string().min(1).optional(),
  RATE_LIMIT_PROVIDER: z.enum(["memory", "platform"]).default("memory"),
});

const productionEnvSchema = baseEnvSchema.extend({
  APPLICATION_ENCRYPTION_KEY: z.string().regex(/^[a-f0-9]{64}$/i),
  PAYSTACK_SECRET_KEY: z.string().min(1),
  RATE_LIMIT_PROVIDER: z.literal("platform"),
});

function readProcessEnv() {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    APPLICATION_ENCRYPTION_KEY: process.env.APPLICATION_ENCRYPTION_KEY,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    RATE_LIMIT_PROVIDER: process.env.RATE_LIMIT_PROVIDER,
  };
}

export function getEnv() {
  const values = readProcessEnv();
  return process.env.NODE_ENV === "production" ? productionEnvSchema.parse(values) : baseEnvSchema.parse(values);
}

export function validateProductionEnv() {
  return productionEnvSchema.parse(readProcessEnv());
}