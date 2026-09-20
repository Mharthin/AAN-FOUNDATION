import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { registerUser } from "@/features/auth/workflow";
import { checkRateLimit, requestClientKey } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const limit = checkRateLimit(`auth-register:${requestClientKey(request)}`, 5, 15 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  try {
    const user = await registerUser(await request.json());
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create account." }, { status: 400 });
  }
}
