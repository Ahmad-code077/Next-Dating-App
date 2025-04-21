import { z } from 'zod';

export const memberEditFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is Required' }),
  description: z
    .string()
    .min(20, { message: 'Description must be at least 20 character' }),
  city: z.string().min(1, {
    message: 'City is Required',
  }),
  country: z.string().min(1, {
    message: 'country is Required',
  }),
});

export type MemberEditFormSchema = z.infer<typeof memberEditFormSchema>;
