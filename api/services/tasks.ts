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

const deleteTask = async (id: string): Promise<TaskEntry | null> => {
  const deletedTask = await Task.findByIdAndDelete(id);
  return deletedTask;
};

export default {
  addTask,
  modifyTask,
  deleteTask,
};
