import { z } from 'zod';
import { calculateYear } from '../utils';

export const registerSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters long'),
  email: z
    .string()
    .email('Please provide a valid email address')
    .nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const profileSchema = z.object({
  gender: z.string().min(1),
  description: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  dateOfBirth: z
    .string()
    .min(1, {
      message: 'Date of birth is required',
    })
    .refine(
      (dateString) => {
        const age = calculateYear(new Date(dateString));
        return age >= 18;
      },
      {
        message: 'You must be at least 18 to use this app',
      }
    ),
});

export const combinedRegisterSchema = registerSchema.and(profileSchema);

export type registerFromType = z.infer<
  typeof registerSchema & typeof profileSchema
>;
