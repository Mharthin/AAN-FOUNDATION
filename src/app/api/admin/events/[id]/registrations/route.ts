import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireCmsPermission } from "@/lib/security/cms-authorization";

function csvCell(value: string | number | Date | null) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireCmsPermission("events");
    const registrations = await prisma.eventRegistration.findMany({ where: { eventId: (await params).id }, orderBy: { createdAt: "asc" } });
    if (new URL(request.url).searchParams.get("format") === "csv") {
      const csv = ["Full name,Email,Phone,Notes,Registered at", ...registrations.map((item) => [item.fullName, item.email, item.phone, item.notes, item.createdAt].map(csvCell).join(","))].join("\r\n");
      return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=event-registrations.csv" } });
    }
    return NextResponse.json(registrations);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unauthorized" }, { status: 401 }); }
}
