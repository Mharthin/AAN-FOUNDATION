import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.program.upsert({
    where: { slug: "education-scholarships" },
    update: {},
    create: {
      name: "Education & Scholarships",
      slug: "education-scholarships",
      summary: "Placeholder program record for local development.",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });