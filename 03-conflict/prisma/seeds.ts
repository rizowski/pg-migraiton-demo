import { faker } from '@faker-js/faker';
import { PrismaClient } from '../client';

const prisma = new PrismaClient();

const sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const manySample = (arr: any[], n: number) =>
  Array(n)
    .fill(null)
    .map(() => sample(arr));

(async () => {
  await prisma.$queryRaw`truncate "TheLegacyTableNoOneWantsToOwn"`;

  await prisma.theLegacyTableNoOneWantsToOwn.createMany({
    data: Array(5)
      .fill(null)
      .map(() => ({
        data: faker.lorem.sentence(),
        date: faker.date.recent().toISOString(),
        detail: JSON.stringify({ foo: 'bar' }),
        item: faker.lorem.word(),
        entry: faker.lorem.sentence(),
        value: faker.number.float().toString(),
      })),
    skipDuplicates: true,
  });
})();
