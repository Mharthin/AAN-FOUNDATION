import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";

const staticRoutes = ["/", "/about", "/about/story", "/about/values", "/about/vision-mission", "/programs", "/scholarships", "/stories", "/events", "/donate", "/volunteer", "/mentorship"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: route === "/" ? "weekly" : "monthly", priority: route === "/" ? 1 : 0.7 }));
  if (!process.env.DATABASE_URL) return routes;

  const [programs, scholarships, stories, events] = await Promise.all([
    prisma.program.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.scholarship.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.story.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.event.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);
  return [
    ...routes,
    ...programs.map((item) => ({ url: `${baseUrl}/programs/${item.slug}`, lastModified: item.updatedAt, priority: 0.6 })),
    ...scholarships.map((item) => ({ url: `${baseUrl}/scholarships/${item.slug}`, lastModified: item.updatedAt, priority: 0.6 })),
    ...stories.map((item) => ({ url: `${baseUrl}/stories/${item.slug}`, lastModified: item.updatedAt, priority: 0.6 })),
    ...events.map((item) => ({ url: `${baseUrl}/events/${item.slug}`, lastModified: item.updatedAt, priority: 0.6 })),
  ];
}
