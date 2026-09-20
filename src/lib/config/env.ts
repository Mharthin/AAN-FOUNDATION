import { z } from "zod";

const baseEnvSchema = z.object({
  DATABASE_URL: z.string().url().or(z.string().startsWith("postgresql://")),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  APPLICATION_ENCRYPTION_KEY: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
  PAYSTACK_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: z.string().min(1).optional(),
  CMS_ADMIN_TOKEN: z.string().min(32).optional(),
  CMS_ADMIN_ROLE: z.enum(["SUPER_ADMIN", "ADMINISTRATOR", "PROGRAM_MANAGER", "COMMUNICATIONS_MANAGER", "FINANCE_MANAGER", "REVIEWER"]).default("ADMINISTRATOR"),
});

const productionEnvSchema = baseEnvSchema.extend({
  APPLICATION_ENCRYPTION_KEY: z.string().regex(/^[a-f0-9]{64}$/i),
  PAYSTACK_SECRET_KEY: z.string().min(1),
  CMS_ADMIN_TOKEN: z.string().min(32),
});

function readProcessEnv() {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    APPLICATION_ENCRYPTION_KEY: process.env.APPLICATION_ENCRYPTION_KEY,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    CMS_ADMIN_TOKEN: process.env.CMS_ADMIN_TOKEN,
    CMS_ADMIN_ROLE: process.env.CMS_ADMIN_ROLE,
  };
}

export function getEnv() {
  const values = readProcessEnv();
  return process.env.NODE_ENV === "production" ? productionEnvSchema.parse(values) : baseEnvSchema.parse(values);
}

export function validateProductionEnv() {
  return productionEnvSchema.parse(readProcessEnv());
}