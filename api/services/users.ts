import bcrypt from 'bcrypt';
import User from '../models/user.ts';
import { NewUserEntry, UserEntry } from '../types.ts';
import { NextFunction } from 'express';

const createUser = async (
  user: NewUserEntry,
  next: NextFunction
): Promise<UserEntry | undefined> => {
  const { password, ...rest } = user;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ ...rest, passwordHash });

  try {
    return await newUser.save();
  } catch (error) {
    next(error);
  }
};

const modifyUser = async (
  id: string,
  updatedBody: { username: string }
): Promise<UserEntry | null> => {
  return await User.findByIdAndUpdate(id, updatedBody, {
    new: true,
  });
};

export default { createUser, modifyUser };
