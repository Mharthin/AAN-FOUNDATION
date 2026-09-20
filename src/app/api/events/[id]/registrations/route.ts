import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { registerForEvent } from "@/features/events/workflow";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const registration = await registerForEvent((await params).id, await request.json());
    return NextResponse.json({ id: registration.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ error: "This email is already registered for the event." }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Registration could not be completed." }, { status: 400 });
  }
}
