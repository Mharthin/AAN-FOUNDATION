import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().or(z.string().startsWith("postgresql://")),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  PAYSTACK_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: z.string().min(1).optional(),
  CMS_ADMIN_TOKEN: z.string().min(32).optional(),
});

export function getEnv() {
  return envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    CMS_ADMIN_TOKEN: process.env.CMS_ADMIN_TOKEN,
  });
}