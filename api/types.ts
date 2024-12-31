interface NewTaskEntry {
  task: string;
  description?: string;
  dueDate?: Date;
}

interface TaskEntry extends NewTaskEntry {
  id: number;
}

export { NewTaskEntry, TaskEntry };
