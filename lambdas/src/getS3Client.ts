import aws from "aws-sdk";

const s3 = new aws.S3();

function getS3Client() {
  return s3;
}

export default getS3Client;
