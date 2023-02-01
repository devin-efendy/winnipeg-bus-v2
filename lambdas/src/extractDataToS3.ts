import yauzl from "yauzl";
import getS3Client from "./getS3Client";

const s3 = getS3Client();

const extractDataToS3 = async (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(buffer, { lazyEntries: true }, function (err, zipfile) {
      if (err) {
        console.log(err);
        return reject(err);
      }

      zipfile.readEntry();

      zipfile.on("entry", function (entry) {
        if (/\/$/.test(entry.fileName)) {
          zipfile.readEntry();
        } else {
          zipfile.openReadStream(entry, async function (err, readStream) {
            if (err) {
              return reject(err);
            }

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

              try {
                await s3.upload(params).promise();
                console.log(`Successfully uploaded ${fileName}!`);
              } catch (error) {
                console.log(error);
                return reject(error);
              }
            }

            zipfile.readEntry();
          });
        }
      });

      zipfile.on("end", () => resolve("end"));
    });
  });
};

export default extractDataToS3;
