import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../connections/s3.js';

const BUCKET = process.env.S3_BUCKET || 'files';

export const generatePresignedUrl = async (fileName: string) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 });
};
