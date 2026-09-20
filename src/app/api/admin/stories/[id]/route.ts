import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireCmsAdmin } from "@/lib/security/cms-authorization";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(), slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  excerpt: z.string().trim().min(1).max(500).optional(), body: z.string().trim().min(1).optional(), featuredImage: z.string().url().nullable().optional(),
  category: z.string().trim().min(1).max(80).optional(), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  publishedAt: z.coerce.date().nullable().optional(), seoTitle: z.string().trim().max(200).nullable().optional(), seoDescription: z.string().trim().max(320).nullable().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireCmsAdmin(); const parsed = updateSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Invalid story fields." }, { status: 400 }); const data = { ...parsed.data, ...(parsed.data.status === "PUBLISHED" && parsed.data.publishedAt === undefined ? { publishedAt: new Date() } : {}) }; return NextResponse.json(await prisma.story.update({ where: { id: (await params).id }, data })); }
  catch (error) { console.error("Story update failed", error); return NextResponse.json({ error: "Unable to update story." }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireCmsAdmin(); await prisma.story.delete({ where: { id: (await params).id } }); return new NextResponse(null, { status: 204 }); }
  catch (error) { console.error("Story deletion failed", error); return NextResponse.json({ error: "Unable to delete story." }, { status: 500 }); }
}
