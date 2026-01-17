export type TaskStatus = 0 | 1 | 2;

export interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  status: TaskStatus;
}

export interface TaskFromAPI {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const mapApiTaskToTask = (apiTask: TaskFromAPI): Task => ({
  id: apiTask.id,
  title: apiTask.title,
  description: `Задача пользователя ${apiTask.userId}`,
  createdAt: new Date(),
  status: apiTask.completed ? 2 : 0
});

export type DragItem = {
  type: string;
  task: Task;
};