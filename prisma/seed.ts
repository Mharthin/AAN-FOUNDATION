import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/security/passwords";

const prisma = new PrismaClient();

async function main() {
  await prisma.program.upsert({
    where: { slug: "education-scholarships" },
    update: {},
    create: {
      name: "Education & Scholarships",
      slug: "education-scholarships",
      summary: "Placeholder program record for local development.",
      description: "Placeholder program record for local development. Replace this content with approved program information before publishing.",
      category: "Education & Scholarships",
    },
  });

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_NAME) {
    await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL.toLowerCase() },
      update: { name: process.env.ADMIN_NAME, passwordHash: await hashPassword(process.env.ADMIN_PASSWORD), role: "SUPER_ADMIN", isActive: true },
      create: { name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL.toLowerCase(), passwordHash: await hashPassword(process.env.ADMIN_PASSWORD), role: "SUPER_ADMIN" },
    });
    console.log("Seeded the configured administrator account.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });