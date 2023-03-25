import * as fastcsv from 'fast-csv';
import getS3Object from './getS3Object';

async function parseRoutes() {
  const res = await getS3Object('routes.csv');

  const routes: object[] = await new Promise((resolve, reject) => {
    const result: object[] = [];
    let isColNames = true;
    fastcsv
      .parseStream(res.Body as NodeJS.ReadableStream)
      .on('data', (data: string[]) => {
        if (isColNames) {
          isColNames = false;
          return;
        }

        const [route_id, short_name, long_name, type, url, color, text_color, sort_order] = data;

        result.push({
          route_id,
          short_name,
          long_name,
          type: Number(type),
          url,
          color,
          text_color,
          sort_order: Number(sort_order),
        });
      })
      .on('end', () => {
        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  return routes;
}
export default parseRoutes;
