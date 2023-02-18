import getS3Client from './getS3Client';
import * as dfd from 'danfojs-node';

const s3 = getS3Client();

const BUCKET_NAME = 'winnipeg-transit-static-data';
const OBJ_PREFIX = 'daily';

async function parseTransitData() {
  const presignedUrl = s3.getSignedUrl('getObject', {
    Bucket: BUCKET_NAME,
    Key: `${OBJ_PREFIX}/routes.csv`,
    Expires: 100,
  });

  console.log(presignedUrl);

  const stream = await dfd.readCSV(presignedUrl);
  console.log(stream.columns);
}

export default parseTransitData;
