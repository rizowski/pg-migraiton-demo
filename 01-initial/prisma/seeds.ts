import { faker } from '@faker-js/faker';
import { PrismaClient } from '../client';

const prisma = new PrismaClient();

const sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const manySample = (arr: any[], n: number) =>
  Array(n)
    .fill(null)
    .map(() => sample(arr));

(async () => {
  const usersToCreate = Array(15)
    .fill(null)
    .map(() => ({
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }));

  const users = await prisma.user.createManyAndReturn({
    data: usersToCreate,
    skipDuplicates: true,
  });

  const groupsToCreate = Array(5)
    .fill(null)
    .map(() => ({
      name: `${faker.word.adjective()} Group`,
    }));

  const groups = await prisma.group.createManyAndReturn({
    data: groupsToCreate,
    skipDuplicates: true,
  });

  const sampledUsers = manySample(users, 5);

  await Promise.all(
    sampledUsers.map(({ id }) => {
      return prisma.user.update({
        data: {
          groups: {
            connect: manySample(groups, 2).map(({ id }) => ({ id })),
          },
        },
        where: {
          id,
        },
      });
    })
  );

  const userGroups = await prisma.user.findMany({
    include: {
      groups: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  console.log(userGroups);
})();
