import { PrismaClient } from '../client';

const prisma = new PrismaClient();

(async () => {
  await prisma.$queryRaw`DROP table if exists "_GroupToUser", _prisma_migrations, "groups", users, app_access cascade;`;
})();
