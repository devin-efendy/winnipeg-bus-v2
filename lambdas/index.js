const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async () => {
  const res = await fetch("http://gtfs.winnipegtransit.com/google_transit.zip");
  const buffer = await res.arrayBuffer();

  const params = {
    Bucket: "winnipeg-transit-static-data",
    Key: "daily-data.zip",
    Body: new Uint8Array(buffer),
  };

  try {
    const result = await s3.upload(params).promise();
    return {
      status: 'OK',
      code: 200,
      result
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'ERROR',
      error
    }
  }
};
