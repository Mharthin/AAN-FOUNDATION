import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { registerForEvent } from "@/features/events/workflow";
import { checkRateLimit, requestClientKey } from "@/lib/security/rate-limit";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const rate = checkRateLimit(`event-registration:${requestClientKey(request)}`, 20, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: "Too many registration attempts. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
  try {
    const registration = await registerForEvent((await params).id, await request.json());
    return NextResponse.json({ id: registration.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ error: "This email is already registered for the event." }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Registration could not be completed." }, { status: 400 });
  }
}
