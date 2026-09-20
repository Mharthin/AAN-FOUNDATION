import { prisma } from "@/lib/db/prisma";

const publicStoryFields = {
  id: true, title: true, slug: true, excerpt: true, body: true, featuredImage: true,
  category: true, seoTitle: true, seoDescription: true, publishedAt: true,
  author: { select: { name: true } },
} as const;

export async function getPublishedStories({ query, category, page = 1, pageSize = 6 }: { query?: string; category?: string; page?: number; pageSize?: number } = {}) {
  if (!process.env.DATABASE_URL) return { stories: [], total: 0, categories: [] as string[] };
  const where = {
    status: "PUBLISHED" as const,
    publishedAt: { not: null },
    ...(category ? { category } : {}),
    ...(query ? { OR: [{ title: { contains: query, mode: "insensitive" as const } }, { excerpt: { contains: query, mode: "insensitive" as const } }] } : {}),
  };
  const [stories, total, categories] = await Promise.all([
    prisma.story.findMany({ where, select: publicStoryFields, orderBy: { publishedAt: "desc" }, skip: Math.max(0, page - 1) * pageSize, take: pageSize }),
    prisma.story.count({ where }),
    prisma.story.findMany({ where: { status: "PUBLISHED" }, select: { category: true }, distinct: ["category"], orderBy: { category: "asc" } }),
  ]);
  return { stories, total, categories: categories.map((item) => item.category) };
}

export async function getPublishedStoryBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return null;
  return prisma.story.findFirst({ where: { slug, status: "PUBLISHED" }, select: publicStoryFields });
}
