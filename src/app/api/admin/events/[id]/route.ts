import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireCmsPermission } from "@/lib/security/cms-authorization";
import { eventSchema } from "@/lib/validation/event";

const updateSchema = eventSchema.partial();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireCmsPermission("events");
    const parsed = updateSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid event fields." }, { status: 400 });
    return NextResponse.json(await prisma.event.update({ where: { id: (await params).id }, data: parsed.data }));
  } catch (error) { console.error("Event update failed", error); return NextResponse.json({ error: "Unable to update event." }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireCmsPermission("events");
    await prisma.event.update({ where: { id: (await params).id }, data: { status: "CANCELLED" } });
    return new NextResponse(null, { status: 204 });
  } catch (error) { console.error("Event cancellation failed", error); return NextResponse.json({ error: "Unable to cancel event." }, { status: 500 }); }
}
