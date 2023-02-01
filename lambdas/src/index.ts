import extractDataToS3 from "./extractDataToS3";

const main = async () => {
  console.log(
    "Starting extraction for file: http://gtfs.winnipegtransit.com/google_transit.zip"
  );
  try {
    const res = await fetch(
      "http://gtfs.winnipegtransit.com/google_transit.zip"
    );
    const buffer = Buffer.from(await res.arrayBuffer());

    await extractDataToS3(buffer);
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};

export const handler = main;
