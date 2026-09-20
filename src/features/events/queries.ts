import { prisma } from "@/lib/db/prisma";

const eventFields = {
  id: true, title: true, slug: true, summary: true, description: true,
  startsAt: true, endsAt: true, location: true, featuredImage: true,
  capacity: true, registrationDeadline: true, status: true,
  _count: { select: { registrations: true } },
} as const;

export async function getPublishedEvents() {
  if (!process.env.DATABASE_URL) return [];
  return prisma.event.findMany({
    where: { status: "PUBLISHED", startsAt: { gte: new Date() } },
    select: eventFields,
    orderBy: { startsAt: "asc" },
  });
}

export async function getPublishedEventBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return null;
  return prisma.event.findFirst({ where: { slug, status: "PUBLISHED" }, select: eventFields });
}
