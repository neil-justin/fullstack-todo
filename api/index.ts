import express from 'express';

import tasksRouter from './controllers/task.ts';
import usersRouter from './controllers/user.ts';
import { errorHandler } from './util/middleware.ts';

const app = express();

app.use(express.json());

app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

export default app;
