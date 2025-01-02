import { string } from 'zod';

interface NewTaskEntry {
  task: string;
  description?: string | null | undefined;
  dueDate?: Date | null | undefined;
}

interface TaskEntry extends NewTaskEntry {
  id: string;
}

interface NewUserEntry {
  username: string;
  email: string;
  password: string;
}

interface UserEntry extends Omit<NewUserEntry, 'password'> {
  id?: string;
  passwordHash: string;
}

interface NewUsernameEntry {
  username: string;
}

export { NewTaskEntry, TaskEntry, NewUserEntry, UserEntry, NewUsernameEntry };
