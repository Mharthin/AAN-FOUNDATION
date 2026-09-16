import type { Scholarship } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

const scholarshipFields = {
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  description: true,
  eligibility: true,
  applicationInfo: true,
  featuredImage: true,
  gallery: true,
  startDate: true,
  endDate: true,
  status: true,
  featured: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type PublicScholarship = Pick<Scholarship, keyof ScholarshipFields>;
type ScholarshipFields = { [Key in keyof typeof scholarshipFields]: true };

export async function getPublishedScholarships(): Promise<PublicScholarship[]> {
  if (!process.env.DATABASE_URL) return [];
  return prisma.scholarship.findMany({ where: { status: "PUBLISHED" }, select: scholarshipFields, orderBy: [{ featured: "desc" }, { endDate: "asc" }] });
}

export async function getPublishedScholarshipBySlug(slug: string): Promise<PublicScholarship | null> {
  if (!process.env.DATABASE_URL) return null;
  return prisma.scholarship.findFirst({ where: { slug, status: "PUBLISHED" }, select: scholarshipFields });
}
