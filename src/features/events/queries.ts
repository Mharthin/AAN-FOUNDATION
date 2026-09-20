import { prisma } from "@/lib/db/prisma";

const eventListFields = {
  id: true, title: true, slug: true, summary: true,
  startsAt: true, endsAt: true, location: true, featuredImage: true,
  capacity: true, registrationDeadline: true, status: true,
  _count: { select: { registrations: true } },
} as const;
const eventDetailFields = { ...eventListFields, description: true } as const;

export async function getPublishedEvents() {
  if (!process.env.DATABASE_URL) return [];
  return prisma.event.findMany({
    where: { status: "PUBLISHED", startsAt: { gte: new Date() } },
    select: eventListFields,
    orderBy: { startsAt: "asc" },
  });
}

export async function getPublishedEventBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return null;
  return prisma.event.findFirst({ where: { slug, status: "PUBLISHED" }, select: eventDetailFields });
}
