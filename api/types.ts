interface NewTaskEntry {
  task: string;
  description?: string | null | undefined;
  dueDate?: Date | null | undefined;
}

interface TaskEntry extends NewTaskEntry {
  id: string;
}

export { NewTaskEntry, TaskEntry };
