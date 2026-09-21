import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requireCmsPermission } from "@/lib/security/cms-authorization";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(), slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  excerpt: z.string().trim().min(1).max(500).optional(), body: z.string().trim().min(1).optional(), featuredImage: z.string().url().nullable().optional(),
  category: z.string().trim().min(1).max(80).optional(), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  publishedAt: z.coerce.date().nullable().optional(), seoTitle: z.string().trim().max(200).nullable().optional(), seoDescription: z.string().trim().max(320).nullable().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireCmsPermission("stories");
    const parsed = updateSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid story fields." }, { status: 400 });
    const data = { ...parsed.data, ...(parsed.data.status === "PUBLISHED" && parsed.data.publishedAt === undefined ? { publishedAt: new Date() } : {}) };
    return NextResponse.json(await prisma.story.update({ where: { id: (await params).id }, data }));
  } catch (error) {
    return storyErrorResponse(error, "update");
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireCmsPermission("stories");
    await prisma.story.delete({ where: { id: (await params).id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return storyErrorResponse(error, "delete");
  }
}

function storyErrorResponse(error: unknown, action: "update" | "delete") {
  if (error instanceof Error && error.message === "CMS administrator authentication required.") {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (error instanceof Error && error.message.startsWith("You do not have permission")) {
    return NextResponse.json({ error: "You do not have permission to manage stories." }, { status: 403 });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    return NextResponse.json({ error: "Story not found." }, { status: 404 });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return NextResponse.json({ error: "A story with those unique fields already exists." }, { status: 409 });
  }
  console.error(`Story ${action} failed`, error);
  return NextResponse.json({ error: `Unable to ${action} story.` }, { status: 500 });
}
