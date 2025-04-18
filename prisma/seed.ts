import { PrismaClient } from '@prisma/client';
import { membersData } from './membersData';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();
// async function seedMembers() {
//   return membersData.map(async (singlemember) =>
//     prisma.user.create({
//       data: {
//         email: singlemember.email,

//         emailVerified: new Date(),
//         name: singlemember.name,
//         passwordHash: await hash('password', 10),
//         image: singlemember.image,
//         member: {
//           create: {
//             dateOfBirth: new Date(singlemember.dateOfBirth),
//             gender: singlemember.gender,
//             name: singlemember.name,
//             created: new Date(singlemember.created),
//             updated: new Date(singlemember.lastActive),
//             description: singlemember.description,
//             city: singlemember.city,
//             country: singlemember.country,
//             image: singlemember.image,
//             photos: {
//               create: {
//                 url: singlemember.image,
//               },
//             },
//           },
//         },
//       },
//     })
//   );
// }
async function seedMembers() {
  await Promise.all(
    membersData.map(async (singlemember) =>
      prisma.user.create({
        data: {
          email: singlemember.email,
          emailVerified: new Date(),
          name: singlemember.name,
          passwordHash: await hash('password', 10),
          image: singlemember.image,
          member: {
            create: {
              dateOfBirth: new Date(singlemember.dateOfBirth),
              gender: singlemember.gender,
              name: singlemember.name,
              created: new Date(singlemember.created),
              updated: new Date(singlemember.lastActive),
              description: singlemember.description,
              city: singlemember.city,
              country: singlemember.country,
              image: singlemember.image,
              photos: {
                create: {
                  url: singlemember.image,
                },
              },
            },
          },
        },
      })
    )
  );
}

async function main() {
  console.log('🌱 Starting seed...');
  await seedMembers();
  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
