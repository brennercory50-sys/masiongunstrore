import { S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

export function getBucketConfig() {
  return {
    bucketName: process.env.AWS_BUCKET_NAME ?? '',
    folderPrefix: process.env.AWS_FOLDER_PREFIX ?? '',
  };
}

export function createS3Client() {
  const clientConfig: { region: string; credentials?: ReturnType<typeof fromIni> } = {
    region: process.env.AWS_REGION ?? 'us-east-1',
  };

  if (process.env.AWS_PROFILE) {
    clientConfig.credentials = fromIni({ profile: process.env.AWS_PROFILE });
  }

  return new S3Client(clientConfig);
}
