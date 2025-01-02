import { z } from 'zod';
import { NextFunction, Response, Request } from 'express';

const NewTaskSchema = z.object({
  task: z.string(),
  description: z.string().optional(),
  dueDate: z.string().date().optional(),
});

const NewUserSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

const UpdatedUserSchema = z.string();

const updatedUserParser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    UpdatedUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export { NewTaskSchema, NewUserSchema, updatedUserParser };
