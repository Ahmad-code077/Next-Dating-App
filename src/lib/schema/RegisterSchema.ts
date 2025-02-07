import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters long'),
  email: z
    .string()
    .email('Please provide a valid email address')
    .nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type registerFromType = z.infer<typeof registerSchema>;
