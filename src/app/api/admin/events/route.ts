import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireCmsPermission } from "@/lib/security/cms-authorization";
import { eventSchema } from "@/lib/validation/event";

export async function GET(request: Request) {
  try {
    await requireCmsPermission("events");
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || undefined;
    const events = await prisma.event.findMany({ where: query ? { OR: [{ title: { contains: query, mode: "insensitive" } }, { slug: { contains: query, mode: "insensitive" } }] } : undefined, orderBy: { startsAt: "desc" }, include: { _count: { select: { registrations: true } } } });
    return NextResponse.json(events);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unauthorized" }, { status: 401 }); }
}

export async function POST(request: Request) {
  try {
    await requireCmsPermission("events");
    const parsed = eventSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid event fields." }, { status: 400 });
    return NextResponse.json(await prisma.event.create({ data: parsed.data }), { status: 201 });
  } catch (error) { console.error("Event creation failed", error); return NextResponse.json({ error: "Unable to create event." }, { status: 500 }); }
}
