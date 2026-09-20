import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireCmsPermission } from "@/lib/security/cms-authorization";

export async function GET(request: Request) {
  try {
    await requireCmsPermission("donations");
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || 1) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get("pageSize") || 25) || 25));
    const [donations, total] = await Promise.all([
      prisma.donation.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize, select: { id: true, amount: true, currency: true, purpose: true, donorName: true, donorEmail: true, donorPhone: true, reference: true, status: true, createdAt: true, paidAt: true } }),
      prisma.donation.count(),
    ]);
    return NextResponse.json({ donations, total, page, pageSize });
  } catch {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
}
