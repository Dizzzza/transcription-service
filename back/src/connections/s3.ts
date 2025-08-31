import { S3Client } from '@aws-sdk/client-s3';

console.log(process.env.MINIO_ROOT_USER);
console.log(process.env.MINIO_ROOT_PASSWORD);

export const s3 = new S3Client({
  region: process.env.MINIO_ROOT_REGION || 'us-east-1',
  endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ROOT_USER || 'user',
    secretAccessKey: process.env.MINIO_ROOT_PASSWORD || 'password',
  },
});
