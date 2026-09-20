import { z } from "zod";

export const donationPurposes = [
  "Education & Scholarships",
  "Humanitarian Support",
  "Youth Empowerment",
  "Community Development",
  "General Fund",
] as const;

export const donationInputSchema = z.object({
  amount: z.number().int().min(1).max(10_000_000),
  purpose: z.enum(donationPurposes),
  donorName: z.string().trim().min(2).max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(1_000).optional().or(z.literal("")),
});

export type DonationInput = z.infer<typeof donationInputSchema>;
