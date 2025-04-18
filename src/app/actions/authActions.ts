'use server';

import { auth, signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { loginFormType } from '@/lib/schema/LoginSchema';
import { registerFromType, registerSchema } from '@/lib/schema/RegisterSchema';
import { ActionResult } from '@/types';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

// SignUp function function
export async function registerUser(
  data: registerFromType
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }
    const { name, email, password } = validated.data;

    const checkIfExsist = await prisma.user.findUnique({ where: { email } });

    if (checkIfExsist) {
      return { status: 'error', error: 'User Already Exsist' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
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
// Login function

export async function signInUser(
  data: loginFormType
): Promise<ActionResult<string>> {
  try {
    const user = await getUserByEmail(data.email);
    if (!user) {
      return { status: 'error', error: 'User not found' };
    }

    // If user exists, attempt sign in
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // Handle potential redirect errors
    if (result?.error) {
      return { status: 'error', error: 'Invalid credentials' };
    }

    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    console.error('Login Error:', error);
    if (error instanceof AuthError) {
      return { status: 'error', error: 'Authentication failed' };
    }
    return { status: 'error', error: 'Something went wrong' };
  }
}
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}

export async function getAuthUserId() {
  const session = await auth();
  console.log('session', session);
  const userId = session?.user?.id;
  if (!userId) throw new Error('Unauthorized');
  return userId;
}
