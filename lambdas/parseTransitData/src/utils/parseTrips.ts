import * as fastcsv from 'fast-csv';
import getS3Object from './getS3Object';

async function parseTrips() {
  const res = await getS3Object('trips.csv');

  const trips: object[] = await new Promise((resolve, reject) => {
    const result: object[] = [];
    let isColNames = true;
    fastcsv
      .parseStream(res.Body as NodeJS.ReadableStream)
      .on('data', (data: string[]) => {
        if (isColNames) {
          isColNames = false;
          return;
        }

        const [route_id, service_id, trip_id, trip_headsign, direction_id, block_id, shape_id, wheelchair_accessible] =
          data;

        result.push({
          route_id,
          service_id,
          trip_id,
          trip_headsign,
          direction_id,
          block_id,
          shape_id,
          wheelchair_accessible,
        });
      })
      .on('end', () => {
        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  return trips;
}
export default parseTrips;
