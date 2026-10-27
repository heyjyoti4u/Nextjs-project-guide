import { z } from 'zod';

export const registerTokenSchema = z.object({
  token: z.string().min(20).max(4096),
  platform: z.enum(['web', 'android', 'ios']).default('web'),
});
