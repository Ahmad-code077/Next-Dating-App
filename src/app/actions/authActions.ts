'use server';

import { signIn, signOut } from '@/auth';
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
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid credentials' };
        default:
          return { status: 'error', error: 'Something went wrong' };
      }
    } else {
      return { status: 'error', error: 'Something else went wrong' };
    }
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}
