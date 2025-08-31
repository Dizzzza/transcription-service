import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../connections/s3.js';
import { v4 as uuid } from 'uuid';
import path from 'path';

const BUCKET = process.env.MINIO_BUCKET || 'files';

export const generatePresignedUrl = async (fileName: string) => {
  const ext = path.extname(fileName); // возьмём только расширение
  const key = `${uuid()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 });
};
