import { NextResponse } from "next/server";
import { destroySession } from "@/lib/security/session";

export async function POST() {
  await destroySession();
  return NextResponse.json({ signedOut: true });
}
