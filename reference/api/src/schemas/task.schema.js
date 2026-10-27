import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title zaroori hai').max(120),
  description: z.string().trim().max(1000).optional(),
  dueDate: z.string().datetime().optional(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  done: z.boolean().optional(),
});

export const idParamSchema = z.object({ id: z.string().uuid('id galat hai') });
