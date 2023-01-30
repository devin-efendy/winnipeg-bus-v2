const yauzl = require("yauzl");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: "",
  region: "",
});

const sequentialS3Upload = async (buffer) => {
  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(buffer, { lazyEntries: true }, function (err, zipfile) {
      if (err) {
        console.log(err);
        rejects(err);
      }

      zipfile.readEntry();

      zipfile.on("entry", function (entry) {
        if (/\/$/.test(entry.fileName)) {
          zipfile.readEntry();
        } else {
          zipfile.openReadStream(entry, async function (err, readStream) {
            if (err) reject(err);
            const { fileName } = entry;

            if (
              [
                "stop_times.txt",
                "routes.txt",
                "trips.txt",
                "stops.txt",
              ].includes(fileName)
            ) {
              const params = {
                Bucket: "winnipeg-transit-static-data",
                Key: `daily/${fileName}`,
                Body: readStream,
              };

              const result = await s3.upload(params).promise();
              console.log(`${fileName} is successfully uploaded...`);
            }

            zipfile.readEntry();
          });
        }
      });

      zipfile.on("end", () => resolve("end"));
    });
  });
};

const main = async () => {
  try {
    const res = await fetch(
      "http://gtfs.winnipegtransit.com/google_transit.zip"
    );
    const buffer = Buffer.from(await res.arrayBuffer());

    console.log(await sequentialS3Upload(buffer));
    console.log("finished successfully...");
  } catch (error) {
    console.log(error);
  }
};

main();
