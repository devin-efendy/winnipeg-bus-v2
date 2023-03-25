import pgp from 'pg-promise';
import { DbConfig } from './config';
import parseRoutes from './utils/parseRoutes';
import parseStops from './utils/parseStops';
import parseStopTimes from './utils/parseStopTimes';
import parseTrips from './utils/parseTrips';

const pg = pgp({ capSQL: true });
const db = pg({
  host: DbConfig.Host,
  port: Number(DbConfig.Port),
  database: DbConfig.Database,
  user: DbConfig.Username,
  password: DbConfig.Password,
  allowExitOnIdle: true,
});

async function insertToDB(table: string, columns: string[], values: object[]) {
  const cs = new pg.helpers.ColumnSet(columns, {
    table: table,
  });

  const query = pg.helpers.insert(values, cs);

  await db.none(`TRUNCATE TABLE ${table}`); // daily data, non-relevant next day
  await db.none(query);
}

async function parseTransitData() {
  console.time('Parsing stop_times.csv');
  const stopTimes = await parseStopTimes();
  console.timeEnd('Parsing stop_times.csv');

  console.time('Insert stop_times to DB');
  await insertToDB('stop_times', ['trip_id', 'arrival_time', 'departure_time', 'stop_id', 'stop_sequence'], stopTimes);
  console.timeEnd('Insert stop_times to DB');

  console.time('Parsing trips.csv');
  const trips = await parseTrips();
  console.timeEnd('Parsing trips.csv');

  console.time('Insert trips to DB');
  await insertToDB(
    'trips',
    [
      'route_id',
      'service_id',
      'trip_id',
      'trip_headsign',
      'direction_id',
      'block_id',
      'shape_id',
      'wheelchair_accessible',
    ],
    trips,
  );
  console.timeEnd('Insert trips to DB');

  console.time('Parsing routes.csv');
  const routes = await parseRoutes();
  console.timeEnd('Parsing routes.csv');

  console.time('Insert routes to DB');
  await insertToDB(
    'routes',
    ['route_id', 'short_name', 'long_name', 'type', 'url', 'color', 'text_color', 'sort_order'],
    routes,
  );
  console.timeEnd('Insert routes to DB');

  console.time('Parsing stops and adding passing routes');
  const stops: any[] = await parseStops();
  const stopsWithRoutes: any[] = [];

  const promises: Promise<unknown>[] = [];

  stops.forEach((stop: any) => {
    const job = new Promise(async (resolve, reject) => {
      const res = await db.one(
        `select array_agg(distinct(route_id)) from trips where trip_id = ANY(select trip_id from stop_times st where stop_id = ${stop.stop_id})`,
      );
      stopsWithRoutes.push({ ...stop, routes: res['array_agg'] });
      resolve(null);
    });

    promises.push(job);
  });

  await Promise.all(promises);
  console.timeEnd('Parsing stops and adding passing routes');

  await insertToDB(
    'stops',
    ['stop_id', 'stop_code', 'stop_name', 'stop_lat', 'stop_lon', 'stop_url', 'routes'],
    stopsWithRoutes,
  );

  console.log('closing connection...');
  db.$pool.end();
}

export default parseTransitData;
