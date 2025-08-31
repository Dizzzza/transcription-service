import { gql } from "@apollo/client";

export type TaskStatus = "processing" | "completed";

export interface Task {
  id: string;
  status: TaskStatus;
  s3Url: string;
  transcription?: string;
}

export interface GenerateUploadUrlResponse {
  generateUploadUrl: {
    uploadUrl: string;
  };
}

export interface GenerateUploadUrlVars {
  filename: string;
}

// ---- CREATE_TASK ----
export interface CreateTaskResponse {
  createTask: Task;
}

export interface CreateTaskVars {
  id: string;
  s3Url: string;
}

// ---- GET_TASK ----
export interface GetTaskResponse {
  task: Task;
}

export interface GetTaskVars {
  id: string;
}

export const GENERATE_UPLOAD_URL = gql`
  mutation GenerateUploadUrl($filename: String!) {
    generateUploadUrl(filename: $filename) {
      uploadUrl
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($id: ID!, $s3Url: String!) {
    createTask(id: $id, s3Url: $s3Url) {
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
