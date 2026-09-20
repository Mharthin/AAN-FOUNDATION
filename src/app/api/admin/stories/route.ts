import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireCmsAdmin } from "@/lib/security/cms-authorization";
import { z } from "zod";

const storySchema = z.object({
  title: z.string().trim().min(1).max(200), slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().min(1).max(500), body: z.string().trim().min(1), featuredImage: z.string().url().optional().or(z.literal("")),
  category: z.string().trim().min(1).max(80), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]), publishedAt: z.coerce.date().nullable().optional(),
  seoTitle: z.string().trim().max(200).optional().or(z.literal("")), seoDescription: z.string().trim().max(320).optional().or(z.literal("")),
});

export async function GET() {
  try { await requireCmsAdmin(); return NextResponse.json(await prisma.story.findMany({ orderBy: { updatedAt: "desc" }, include: { author: { select: { name: true, email: true } } } })); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unauthorized" }, { status: 401 }); }
}

export async function POST(request: Request) {
  try {
    await requireCmsAdmin(); const parsed = storySchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid story fields." }, { status: 400 });
    const story = await prisma.story.create({ data: { ...parsed.data, featuredImage: parsed.data.featuredImage || null, seoTitle: parsed.data.seoTitle || null, seoDescription: parsed.data.seoDescription || null, publishedAt: parsed.data.status === "PUBLISHED" ? parsed.data.publishedAt || new Date() : null } });
    return NextResponse.json(story, { status: 201 });
  } catch (error) { console.error("Story creation failed", error); return NextResponse.json({ error: "Unable to create story." }, { status: 500 }); }
}
