import { PrismaClient } from '../client';

const prisma = new PrismaClient();

(async () => {
  await prisma.$transaction([prisma.group.deleteMany(), prisma.user.deleteMany()]);
})();
