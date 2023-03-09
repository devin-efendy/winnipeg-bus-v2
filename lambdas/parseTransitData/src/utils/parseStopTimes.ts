import moment from 'moment';
import * as fastcsv from 'fast-csv';
import getS3Object from './getS3Object';

const today = moment();
const tmr = moment().add(1, 'd');

const day = today.date();
const month = today.month() + 1;
const year = today.year();

const nextDay = tmr.date();
const nextMonth = tmr.month() + 1;
const nextYear = tmr.year();

function formatDate(date: string) {
  let [hour, minute, second] = date.split(':');

  const isNextDay = Number(hour) >= 24;

  const dateDay = isNextDay ? nextDay : day;
  const dateMonth = isNextDay ? nextMonth : month;
  const dateYear = isNextDay ? nextYear : year;

  hour = isNextDay ? (Number(hour) - 24).toString() : hour;
  hour = hour.padStart(2, '0');

  return `${dateYear}-${dateMonth}-${dateDay} ${hour}:${minute}:${second}`;
}

async function parseStopTimes() {
  const res = await getS3Object('stop_times.csv');

  const stopTimes: object[] = await new Promise((resolve, reject) => {
    const result: object[] = [];
    let isColNames = true;
    fastcsv
      .parseStream(res.Body as NodeJS.ReadableStream)
      .on('data', (data: string[]) => {
        if (isColNames) {
          isColNames = false;
          return;
        }

        data[1] = formatDate(data[1]);
        data[2] = formatDate(data[2]);
        result.push({
          trip_id: Number(data[0]),
          arrival_time: data[1],
          departure_time: data[2],
          stop_id: Number(data[3]),
          stop_sequence: Number(data[4]),
        });
      })
      .on('end', () => {
        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  return stopTimes;
}
export default parseStopTimes;
