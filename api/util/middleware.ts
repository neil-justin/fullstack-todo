import express, { NextFunction, Response, Request } from 'express';
import { z } from 'zod';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

export { errorHandler };
