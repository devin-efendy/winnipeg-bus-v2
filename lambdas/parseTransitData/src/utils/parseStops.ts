import * as fastcsv from 'fast-csv';
import getS3Object from './getS3Object';

async function parseStops() {
  const res = await getS3Object('stops.csv');

  const stops: object[] = await new Promise((resolve, reject) => {
    const result: object[] = [];
    let isColNames = true;
    fastcsv
      .parseStream(res.Body as NodeJS.ReadableStream)
      .on('data', (data: string[]) => {
        if (isColNames) {
          isColNames = false;
          return;
        }

        const [stop_id, stop_code, stop_name, stop_lat, stop_lon, stop_url] = data;

        result.push({
          stop_id: Number(stop_id),
          stop_code: Number(stop_code),
          stop_name,
          stop_lat,
          stop_lon,
          stop_url,
        });
      })
      .on('end', () => {
        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  return stops;
}
export default parseStops;
