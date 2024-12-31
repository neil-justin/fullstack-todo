import express from 'express';

import { PORT } from './util/config.ts';
import tasksRouter from './controllers/task.ts';
import connectToDB from './util/db.ts';
import { errorHandler } from './util/middleware.ts';

const app = express();

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use(errorHandler);

const startApp = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log('Express app is listening on PORT ' + PORT);
  });
};

startApp();
