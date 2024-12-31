import express, { NextFunction, Response, Request } from 'express';

import tasksService from '../services/tasks';
import { NewTaskSchema } from '../util/parser';
import { NewTaskEntry, TaskEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<string>) => {
  res.send('/api/tasks');
});

const newTaskParser = (req: Request, res: Response, next: NextFunction) => {
  try {
    NewTaskSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

router.post(
  '/',
  newTaskParser,
  async (
    req: Request<unknown, unknown, NewTaskEntry>,
    res: Response<TaskEntry>
  ) => {
    console.log('req.body', req.body);
    const addedTask = await tasksService.addTask(req.body);
  }
);

export default router;
