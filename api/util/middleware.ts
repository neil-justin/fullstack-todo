import express, { NextFunction, Response, Request } from 'express';
import { MongooseError } from 'mongoose';
import { z } from 'zod';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else if (error instanceof MongooseError) {
    res.status(400).send({ error: error.message });
  } else {
    res.status(400).send({ error });
  }
};

export { errorHandler };
