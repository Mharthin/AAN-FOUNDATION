import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { isValidPaystackSignature, verifyDonation } from "@/features/donations/workflow";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!isValidPaystackSignature(rawBody, request.headers.get("x-paystack-signature"))) return new NextResponse("Unauthorized", { status: 401 });
  let event: { event: string; data?: { id?: number; reference: string } };
  try { event = JSON.parse(rawBody) as typeof event; } catch { return new NextResponse("Invalid payload", { status: 400 }); }
  const eventId = event.data?.id ? String(event.data.id) : `${event.event}:${event.data?.reference ?? "unknown"}`;
  try {
    await prisma.paystackWebhookEvent.create({ data: { eventId, eventType: event.event } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ received: true });
    throw error;
  }
  if (event.event === "charge.success" && event.data?.reference) await verifyDonation(event.data.reference);
  if (event.event === "charge.failed" && event.data?.reference) await prisma.donation.updateMany({ where: { reference: event.data.reference, status: "PENDING" }, data: { status: "FAILED" } });
  return NextResponse.json({ received: true });
}
