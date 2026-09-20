import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { isValidPaystackSignature, verifyDonation } from "@/features/donations/workflow";

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!isValidPaystackSignature(rawBody, request.headers.get("x-paystack-signature"))) return new NextResponse("Unauthorized", { status: 401 });
  const event = JSON.parse(rawBody) as { event: string; data?: { reference: string } };
  if (event.event === "charge.success" && event.data?.reference) await verifyDonation(event.data.reference);
  if (event.event === "charge.failed" && event.data?.reference) await prisma.donation.updateMany({ where: { reference: event.data.reference, status: "PENDING" }, data: { status: "FAILED" } });
  return NextResponse.json({ received: true });
}
