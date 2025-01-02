import express, { NextFunction, Response, Request } from 'express';

import { NewUserSchema, updatedUserParser } from '../util/parser.ts';
import usersService from '../services/users.ts';
import { NewUserEntry, NewUsernameEntry, UserEntry } from '../types.ts';

const router = express.Router();

// router.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   res.json({
//     username: 'neil',
//     email: 'neiljustin.mallari@gmail.com',
//     password: 'neil',
//   });
// });

const newUserParser = (
  req: Request<unknown, unknown, NewUserEntry>,
  res: Response<UserEntry>,
  next: NextFunction
) => {
  try {
    NewUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

router.post(
  '/',
  newUserParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const createdUser = await usersService.createUser(req.body, next);

    if (createdUser) res.json(createdUser);
  }
);

router.put(
  '/:id',
  updatedUserParser,
  async (
    req: Request<{ id: string }, unknown, NewUsernameEntry>,
    res: Response<UserEntry>,
    next: NextFunction
  ) => {
    const { id: userId } = req.params;
    const updatedUser = await usersService.modifyUser(userId, req.body);

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      next({ errorMessage: `User with an id ${userId} doesn't exists` });
    }
  }
);

router.delete(
  '/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id: userId } = req.params;
    const deletedUser = await usersService.deleteUser(userId);

    if (deletedUser) {
      res.status(204).end();
    } else {
      next({ errorMessage: `User with an id ${userId} doesn't exists` });
    }
  }
);

export default router;
