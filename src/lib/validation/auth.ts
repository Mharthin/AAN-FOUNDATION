import { z } from "zod";

const password = z.string().min(12, "Password must be at least 12 characters.").max(128, "Password is too long.");

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  password,
});

export const signInSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});
