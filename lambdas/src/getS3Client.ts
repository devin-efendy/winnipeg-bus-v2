import aws from "aws-sdk";

let s3: AWS.S3;

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
} else {
  s3 = new aws.S3();
}

function getS3Client() {
  return s3;
}

export default getS3Client;
