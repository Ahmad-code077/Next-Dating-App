'use server';

import { auth, signIn, signOut } from '@/auth';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';
import { loginFormType } from '@/lib/schema/LoginSchema';
import {
  combinedRegisterSchema,
  ProfileSchema,
  registerFromType,
} from '@/lib/schema/RegisterSchema';
import { generateToken, getTokenByToken } from '@/lib/tokens';
import { ActionResult } from '@/types';
import { TokenType, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { subDays } from 'date-fns';
import { AuthError } from 'next-auth';

// SignUp function function
export async function registerUser(
  data: registerFromType
): Promise<ActionResult<User>> {
  try {
    const validated = combinedRegisterSchema.safeParse(data);
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }
    const {
      name,
      email,
      password,
      city,
      country,
      dateOfBirth,
      description,
      gender,
    } = validated.data;

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
        member: {
          create: {
            name,
            city,
            country,
            dateOfBirth: new Date(dateOfBirth),
            description,
            gender,
          },
        },
      },
    });

    const varificationToken = await generateToken(
      email,
      TokenType.VERIFICATION
    );
    // send email to user to verify their email through token
    await sendVerificationEmail(
      varificationToken.email,
      varificationToken.token
    );
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

    if (!user.passwordHash) {
      return {
        status: 'error',
        error: 'Your Account is Associated with other login method ',
      };
    }
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return { status: 'error', error: 'Invalid credentials' };
    }

    if (!user.emailVerified) {
      const twentyFourHoursAgo = subDays(new Date(), 1);
      const emailCount = await prisma.token.count({
        where: {
          email: data.email,
          type: TokenType.VERIFICATION,
          createdAt: { gte: twentyFourHoursAgo },
        },
      });
      if (emailCount >= 3) {
        return {
          status: 'error',
          error:
            'You have requested verification too many times. Please try again later.',
        };
      }
      const { email, token } = await generateToken(
        data.email,
        TokenType.VERIFICATION
      );
      // send email to user to verify their email through token
      await sendVerificationEmail(email, token);
      return {
        status: 'error',
        error: 'Please verify your email before logging in',
      };
    }

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

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
  const userId = session?.user?.id;
  if (!userId) throw new Error('Unauthorized');
  return userId;
}
export async function getUserInfoForNav() {
  const userId = await getAuthUserId();

  return prisma.user.findUnique({
    where: { id: userId },
    select: { image: true, name: true },
  });
}

export async function verifyEmail(
  token: string
): Promise<ActionResult<string>> {
  try {
    const existingToken = await getTokenByToken(token);

    if (!existingToken) {
      return { status: 'error', error: 'Invalid token' };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: 'error', error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: 'error', error: 'User not found' };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date(), profileComplete: true },
    });

    await prisma.token.deleteMany({
      where: {
        email: existingToken.email,
        type: TokenType.VERIFICATION,
      },
    });
    return { status: 'success', data: 'Success' };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateResetPasswordEmail(
  email: string
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { status: 'error', error: 'Email not found' };
    }

    const token = await generateToken(email, TokenType.PASSWORD_RESET);

    await sendPasswordResetEmail(token.email, token.token);

    return {
      status: 'success',
      data: 'Password reset email has been sent.  Please check your emails',
    };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function resetPassword(
  password: string,
  token: string | null
): Promise<ActionResult<string>> {
  try {
    if (!token) return { status: 'error', error: 'Missing token' };

    const existingToken = await getTokenByToken(token);

    if (!existingToken) {
      return { status: 'error', error: 'Invalid token' };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: 'error', error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: 'error', error: 'User not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { passwordHash: hashedPassword },
    });

    await prisma.token.delete({
      where: { id: existingToken.id },
    });

    return {
      status: 'success',
      data: 'Password updated successfully.  Please try logging in',
    };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function completeSocialLoginProfile(
  data: ProfileSchema
): Promise<ActionResult<string>> {
  const session = await auth();

  if (!session?.user) return { status: 'error', error: 'User not found' };

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        profileComplete: true,
        member: {
          create: {
            name: session.user.name as string,
            image: session.user.image,
            gender: data.gender,
            dateOfBirth: new Date(data.dateOfBirth),
            description: data.description,
            city: data.city,
            country: data.country,
            photos: {
              create: {
                url: session.user.image || '',
                isApproved: true,
              },
            },
          },
        },
      },
      select: {
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    });

    return { status: 'success', data: user.accounts[0].provider };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserRole() {
  const session = await auth();

  const role = session?.user.role;

  if (!role) throw new Error('Not in role');

  return role;
}
