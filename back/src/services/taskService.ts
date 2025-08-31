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
  validateS3Url(s3Url);

  tasks[id] = { id, status: 'processing', s3Url };

  setTimeout(() => {
    const task = tasks[id];
    if (task) {
      task.status = 'completed';
      task.transcription = 'Это тестовый результат транскрибации';
    }
  }, 15000);

  // Возвращаем id сразу
  return { id };
};

export const getTask = (id: string) => tasks[id];

export const getAllTasks = () => Object.values(tasks);

const validateS3Url = (s3Url: string) => {
  let url: URL;
  try {
    url = new URL(s3Url);
  } catch {
    throw new Error('Invalid S3 URL');
  }

  const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'http://localhost:9000';

  // Проверяем, что URL указывает на твой MinIO/S3
  const endpoint = new URL(MINIO_ENDPOINT);

  if (url.hostname !== endpoint.hostname) {
    throw new Error('S3 URL does not match configured endpoint');
  }

  const MINIO_BUCKET = process.env.MINIO_BUCKET || 'audio-bucket';

  // Проверка bucket
  if (!url.pathname.startsWith(`/${MINIO_BUCKET}/`)) {
    throw new Error('S3 URL does not belong to the expected bucket');
  }

  return true;
};
