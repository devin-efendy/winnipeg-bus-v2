import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AwsConfig } from '../config';

async function getS3Object(key: string) {
  const client = new S3Client({ region: AwsConfig.Region });
  const command = new GetObjectCommand({ Bucket: AwsConfig.Bucket, Key: `${AwsConfig.Prefix}/${key}` });
  return await client.send(command);
}

export default getS3Object;
