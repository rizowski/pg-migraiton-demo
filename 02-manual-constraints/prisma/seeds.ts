import { faker } from '@faker-js/faker';
import { PrismaClient } from '../client';

const prisma = new PrismaClient();

const sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const manySample = (arr: any[], n: number) =>
  Array(n)
    .fill(null)
    .map(() => sample(arr));

(async () => {
  await prisma.$queryRaw`truncate "_GroupToUser", app_access, groups, users`;
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

  await prisma.appAccess.createMany({
    data: Array(5)
      .fill(null)
      .map(() => ({
        app: 'MyApp',
        tools: ['Fun Tool', 'Death', 'Taxes'],
      })),
    skipDuplicates: true,
  });

  const notAssignedAccess = await prisma.appAccess.findMany({
    where: {
      user: null,
      group: null,
    },
  });

  if (notAssignedAccess.length) {
    throw new Error('Check the DB we have unassigned access!');
  }

  // const userWithAccess = sample(users);

  // await prisma.appAccess.create({
  //   data: {
  //     app: 'MyApp',
  //     tools: ['Fun Tool', 'Death', 'Taxes'],
  //     user: {
  //       connect: {
  //         id: userWithAccess.id,
  //       },
  //     },
  //   },
  // });

  // const user = await prisma.user.findUnique({
  //   include: {
  //     appAccess: true,
  //   },
  //   where: {
  //     id: userWithAccess.id,
  //   },
  // });

  // console.log(JSON.stringify(user, null, 2));
})();
