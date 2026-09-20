import crypto from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { initializePaystackTransaction, verifyPaystackTransaction } from "@/lib/paystack";
import type { DonationInput } from "@/lib/validation/donation";

export async function initializeDonation(input: DonationInput) {
  const reference = `AAN-${crypto.randomUUID()}`;
  await prisma.donation.create({
    data: {
      reference,
      amount: input.amount,
      purpose: input.purpose,
      donorName: input.donorName || null,
      donorEmail: input.email,
      donorPhone: input.phone || null,
      message: input.message || null,
    },
  });

  try {
    return await initializePaystackTransaction({
      email: input.email,
      amount: input.amount,
      reference,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/donate/verify`,
      metadata: { purpose: input.purpose, reference },
    });
  } catch (error) {
    await prisma.donation.update({ where: { reference }, data: { status: "FAILED" } });
    throw error;
  }
}

export async function verifyDonation(reference: string) {
  const donation = await prisma.donation.findUnique({ where: { reference } });
  if (!donation) throw new Error("Donation reference not found.");
  if (donation.status === "SUCCESS") return donation;

  const transaction = await verifyPaystackTransaction(reference);
  const success = transaction.status === "success" && transaction.reference === reference && transaction.amount === donation.amount * 100 && transaction.currency === donation.currency;
  return prisma.donation.update({
    where: { reference },
    data: {
      status: success ? "SUCCESS" : "FAILED",
      gatewayStatus: transaction.gateway_response,
      gatewayResponse: transaction,
      paidAt: success && transaction.paid_at ? new Date(transaction.paid_at) : null,
    },
  });
}

export function isValidPaystackSignature(rawBody: string, signature: string | null) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
