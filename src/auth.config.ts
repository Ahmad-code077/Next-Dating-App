import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './lib/schema/LoginSchema';
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';

export default {
  providers: [
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
        if (!user || !(await compare(password, user.passwordHash))) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
