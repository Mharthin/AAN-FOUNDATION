import { NextResponse } from "next/server";
import { initializeDonation } from "@/features/donations/workflow";
import { donationInputSchema } from "@/lib/validation/donation";
import { checkRateLimit, requestClientKey } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const rate = checkRateLimit(`donation:${requestClientKey(request)}`, 10, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: "Too many donation attempts. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
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
