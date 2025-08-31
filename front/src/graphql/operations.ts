import { gql } from "@apollo/client";

export type TaskStatus = "processing" | "completed";

export interface Task {
  id: string;
  status: TaskStatus;
  s3Url: string;
  transcription?: string;
}

export interface GenerateUploadUrlResponse {
  generateUploadUrl: string;
}

export interface GenerateUploadUrlVars {
  fileName: string;
}

// ---- CREATE_TASK ----
export interface CreateTaskResponse {
  createTask: Task;
}

export interface CreateTaskVars {
  s3Url: string;
}

// ---- GET_TASK ----
export interface GetTaskResponse {
  task: Task;
}

export interface GetTaskVars {
  id: string;
}

// ---- GET_ALL_TASKS ----
export interface GetAllTasksResponse {
  getAllTasks: Task[];
}
export const GENERATE_UPLOAD_URL = gql`
  mutation GenerateUploadUrl($fileName: String!) {
    generateUploadUrl(fileName: $fileName)
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($s3Url: String!) {
    createTask(s3Url: $s3Url) {
      id
      status
      s3Url
      transcription
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      status
      s3Url
      transcription
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      status
      s3Url
      transcription
    }
  }
`;
