import { NextResponse } from "next/server";
import { initializeDonation } from "@/features/donations/workflow";
import { donationInputSchema } from "@/lib/validation/donation";

export async function POST(request: Request) {
  const parsed = donationInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the donation details." }, { status: 400 });
  try {
    const transaction = await initializeDonation(parsed.data);
    return NextResponse.json({ authorizationUrl: transaction.authorization_url, reference: transaction.reference });
  } catch (error) {
    console.error("Donation initialization failed", error);
    return NextResponse.json({ error: "Unable to start the donation. Please try again." }, { status: 502 });
  }
}
