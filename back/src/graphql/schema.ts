import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Task {
    id: ID!
    status: String!
    s3Url: String!
    transcription: String
  }

  type Query {
    getTask(id: ID!): Task
  }

  type Mutation {
    generateUploadUrl(fileName: String!): String!
    createTask(id: ID!, s3Url: String!): Task!
  }
`;
