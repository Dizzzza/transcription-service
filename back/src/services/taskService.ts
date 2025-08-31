type TaskStatus = 'processing' | 'completed';

export interface Task {
  id: string;
  status: TaskStatus;
  s3Url: string;
  transcription?: string;
}

const tasks: Record<string, Task> = {};

export const createTask = (id: string, s3Url: string) => {
  tasks[id] = { id, status: 'processing', s3Url };

  setTimeout(() => {
    const task = tasks[id];
    if (task) {
      task.status = 'completed';
      task.transcription = 'Это тестовый результат транскрибации 🎤';
    }
  }, 15000);
};

export const getTask = (id: string) => tasks[id];
