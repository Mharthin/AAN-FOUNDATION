import { NextResponse } from "next/server";
import { verifyDonation } from "@/features/donations/workflow";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) return NextResponse.json({ error: "Transaction reference is required." }, { status: 400 });
  try {
    const donation = await verifyDonation(reference);
    return NextResponse.json({ status: donation.status, reference: donation.reference });
  } catch (error) {
    console.error("Donation verification failed", error);
    return NextResponse.json({ error: "Unable to verify this donation yet." }, { status: 502 });
  }
}
