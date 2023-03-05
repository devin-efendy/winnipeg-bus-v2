import extractDataToS3 from './extractDataToS3';

// @ts-ignore
const main = async (event, context, callback) => {
  console.log('Starting extraction for file: http://gtfs.winnipegtransit.com/google_transit.zip');
  try {
    const res = await fetch('http://gtfs.winnipegtransit.com/google_transit.zip');
    const buffer = Buffer.from(await res.arrayBuffer());

    await extractDataToS3(buffer);

    console.log('Successfully extract daily transit data to S3!');
    callback(null, 'Success');
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    callback(null, 'Failure');
    return {
      error,
    };
  }
};

export const handler = main;
