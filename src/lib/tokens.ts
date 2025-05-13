'use server';
import { TokenType } from '@prisma/client';
import { prisma } from './prisma';

function generateSecureToken(length = 48) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array); // Web Crypto API
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}

export async function getTokenByEmail(email: string) {
  try {
    return prisma.token.findFirst({
      where: { email },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTokenByToken(token: string) {
  try {
    return prisma.token.findFirst({
      where: { token },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateToken(email: string, type: TokenType) {
  const token = generateSecureToken(); // replace randomBytes
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); //  Expires in 24 hours

  // const existingToken = await getTokenByEmail(email);

  // if (existingToken) {
  //   await prisma.token.delete({
  //     where: { id: existingToken.id },
  //   });
  // }

  return prisma.token.create({
    data: {
      email,
      token,
      expires,
      type,
    },
  });
}
