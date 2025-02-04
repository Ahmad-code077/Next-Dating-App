'use server';

import { prisma } from '@/lib/prisma';
import { registerFrom, registerSchema } from '@/lib/schema/RegisterSchema';
import { ActionResult } from '@/types';
import bcrypt from 'bcryptjs';
import { User } from 'next-auth';

export async function registerUser(
  data: registerFrom
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }
    const { name, email, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkIfExsist = await prisma.user.findUnique({ where: { email } });
    console.log(
      'from check list just to check the error and hold them',
      checkIfExsist
    );
    if (checkIfExsist) {
      return { status: 'error', error: 'User Already Exsist' };
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });
    return { status: 'success', data: user };
  } catch (error) {
    console.error(
      'Registration Error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
}

// export async function getUserByEmail(
//   email: string
// ): Promise<
//   ActionResult<{ id: string; name: string | null; email: string | null }>
// > {
//   try {
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return { status: 'error', error: 'Invalid email format' };
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//       // select: {
//       //   id: true,
//       //   name: true,
//       //   email: true,
//       // },
//     });

//     if (!user) {
//       return { status: 'error', error: 'User not found' };
//     }

//     return { status: 'success', data: user };
//   } catch (error) {
//     console.error('Get User Error:', error);
//     return {
//       status: 'error',
//       error: error instanceof Error ? error.message : 'Database error',
//     };
//   }
// }
