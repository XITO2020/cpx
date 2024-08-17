const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrateEmailVerified() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    // Si emailVerified était une date, on le convertit en booléen
    const isVerified = user.emailVerified instanceof Date;
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: isVerified },
    });
  }

  console.log('Migration terminée');
}

migrateEmailVerified().catch(console.error).finally(() => prisma.$disconnect());
