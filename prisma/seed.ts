import { PrismaClient } from '@prisma/client';
import { membersData } from './membersData';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function seedMembers() {
  await Promise.all(
    membersData.map(async (singlemember) =>
      prisma.user.create({
        data: {
          email: singlemember.email,
          emailVerified: new Date(),
          name: singlemember.name,
          passwordHash: await hash(singlemember.email, 10),
          image: singlemember.image,
          profileComplete: true,
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
                  isApproved: true,
                },
              },
            },
          },
        },
      })
    )
  );
}

async function seedAdmin() {
  return prisma.user.create({
    data: {
      email: 'admin123@gmail.com',
      emailVerified: new Date(),
      name: 'Ahmad Admin',
      passwordHash: await hash('admin123@gmail.com', 10),
      role: 'ADMIN',
    },
  });
}

async function main() {
  console.log('🌱 Starting seed...');
  await seedMembers();
  await seedAdmin();
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
