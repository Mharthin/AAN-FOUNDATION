import { NextResponse } from "next/server";
import { authenticateUser } from "@/features/auth/workflow";
import { checkRateLimit, requestClientKey } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const limit = checkRateLimit(`auth-sign-in:${requestClientKey(request)}`, 10, 15 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  try { return NextResponse.json({ user: await authenticateUser(await request.json()) }); }
  catch { return NextResponse.json({ error: "Invalid email or password." }, { status: 401 }); }
}
