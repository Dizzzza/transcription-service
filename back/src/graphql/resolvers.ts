import { generatePresignedUrl } from '../services/s3Service.js';
import { createTask, getTask } from '../services/taskService.js';

export const resolvers = {
  Query: {
    getTask: (_: any, { id }: { id: string }) => getTask(id),
  },
  Mutation: {
    generateUploadUrl: async (_: any, { filename }: { filename: string }) => {
      return await generatePresignedUrl(filename);
    },
    createTask: (_: any, { id, s3Url }: { id: string; s3Url: string }) => {
      createTask(id, s3Url);
      return getTask(id);
    },
  },
};
