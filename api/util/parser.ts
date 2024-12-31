import { z } from 'zod';

const NewTaskSchema = z.object({
  task: z.string(),
  description: z.string().optional(),
  dueDate: z.string().date().optional(),
});

export { NewTaskSchema };
