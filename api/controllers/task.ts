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
    const addedTask = await tasksService.addTask(req.body);
    res.json(addedTask);
  }
);

router.put(
  '/:id',
  newTaskParser,
  async (
    req: Request<{ id: string }, unknown, NewTaskEntry>,
    res: Response<TaskEntry>,
    next: NextFunction
  ) => {
    const { id: taskId } = req.params;
    const updatedTask = await tasksService.modifyTask(taskId, req.body);

    if (updatedTask) {
      res.json(updatedTask);
    } else {
      next({ message: `Resource with an id ${taskId} doesn't exists` });
    }
  }
);

router.delete(
  '/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id: taskId } = req.params;
    const deletedTask = await tasksService.deleteTask(taskId);

    if (deletedTask) {
      res.status(204).end();
    } else {
      next({ message: `Resource with an id ${taskId} doesn't exists` });
    }
  }
);

export default router;
