import { v4 as uuidv4 } from 'uuid';
type TaskStatus = 'processing' | 'completed';

export interface Task {
  id: string;
  status: TaskStatus;
  s3Url: string;
  transcription?: string;
}

const tasks: Record<string, Task> = {};

export const createTask = (s3Url: string) => {
  const id = uuidv4();

  tasks[id] = { id, status: 'processing', s3Url };

  setTimeout(() => {
    const task = tasks[id];
    if (task) {
      task.status = 'completed';
      task.transcription = 'Это тестовый результат транскрибации 🎤';
    }
  }, 15000);

  // Возвращаем id сразу
  return { id };
};

export const getTask = (id: string) => tasks[id];

export const getAllTasks = () => Object.values(tasks);
