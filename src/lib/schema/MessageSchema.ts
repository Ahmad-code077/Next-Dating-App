import { z } from 'zod';

export const messageSchema = z.object({
  text: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message must be less than 500 characters'),
});

export type MessageSchemaType = z.infer<typeof messageSchema>;
