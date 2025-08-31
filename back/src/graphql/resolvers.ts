import { generatePresignedUrl } from '../services/s3Service.js';
import { createTask, getAllTasks, getTask } from '../services/taskService.js';

export const resolvers = {
  Query: {
    getTask: (_: any, { id }: { id: string }) => getTask(id),
    getAllTasks: () => getAllTasks(),
  },
  Mutation: {
    generateUploadUrl: async (_: any, { fileName }: { fileName: string }) => {
      return await generatePresignedUrl(fileName);
    },
    createTask: (_: any, { s3Url }: { s3Url: string }) => {
      const { id } = createTask(s3Url);
      return getTask(id);
    },
  },
};
