import type { Program } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

const programFields = {
  id: true,
  name: true,
  slug: true,
  summary: true,
  description: true,
  category: true,
  featuredImage: true,
  gallery: true,
  eligibility: true,
  applicationInfo: true,
  startDate: true,
  endDate: true,
  featured: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type PublicProgram = Pick<Program, keyof typeof programFields>;

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export async function getPublishedPrograms(): Promise<PublicProgram[]> {
  if (!hasDatabaseUrl()) return [];

  return prisma.program.findMany({
    where: { status: "PUBLISHED" },
    select: programFields,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function getPublishedProgramBySlug(slug: string): Promise<PublicProgram | null> {
  if (!hasDatabaseUrl()) return null;

  return prisma.program.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: programFields,
  });
}