import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './lib/schema/LoginSchema';
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: 'credentials',
      async authorize(creds) {
        // Validate the input using Zod
        const validated = loginSchema.safeParse(creds);
        if (!validated.success) {
          throw new Error('Invalid input');
        }

        const { email, password } = validated.data;
        const user = await getUserByEmail(email);

        // If no user is found, or password is incorrect, return null
        if (
          !user ||
          !user.passwordHash ||
          !(await compare(password, user.passwordHash))
        ) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error', // Make sure this matches your error page path
  },
} satisfies NextAuthConfig;
