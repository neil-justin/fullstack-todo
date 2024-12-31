import Task from '../models/task';
import { NewTaskEntry, TaskEntry } from '../types';

const addTask = async (task: NewTaskEntry): Promise<TaskEntry> => {
  const newTask = new Task(task);
  const savedTask = (await newTask.save()) as TaskEntry;

  return savedTask;
};

const modifyTask = async (
  id: string,
  updatedBody: NewTaskEntry
): Promise<TaskEntry | null> => {
  const updatedTask = await Task.findByIdAndUpdate(id, updatedBody, {
    new: true,
  });
  return updatedTask;
};

export default {
  addTask,
  modifyTask,
};
