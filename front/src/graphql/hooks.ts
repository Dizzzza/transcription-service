import { useMutation, useQuery } from "@apollo/client/react";
import { GENERATE_UPLOAD_URL, CREATE_TASK, GET_TASK } from "./operations";
import type {
  GenerateUploadUrlResponse,
  GenerateUploadUrlVars,
  CreateTaskResponse,
  CreateTaskVars,
  GetTaskResponse,
  GetTaskVars,
} from "./operations";

// Хук для генерации uploadUrl
export const useGenerateUploadUrl = () =>
  useMutation<GenerateUploadUrlResponse, GenerateUploadUrlVars>(
    GENERATE_UPLOAD_URL
  );

// Хук для создания задачи
export const useCreateTask = () =>
  useMutation<CreateTaskResponse, CreateTaskVars>(CREATE_TASK);

// Хук для получения задачи
export const useGetTask = (id: string) =>
  useQuery<GetTaskResponse, GetTaskVars>(GET_TASK, {
    variables: { id },
  });
