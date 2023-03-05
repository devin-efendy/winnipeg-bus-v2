import pandas as pd
import psycopg
from io import StringIO
import datetime
from dotenv import load_dotenv
import os

if 'PYTHON_ENV' in os.environ:
    load_dotenv()

DB_HOST = os.environ['DB_HOST']
DB_DATABASE = os.environ['DB_DATABASE']
DB_USERNAME = os.environ['DB_USERNAME']
DB_PORT = os.environ['DB_PORT']
DB_PASSWORD = os.environ['DB_PASSWORD']

db_connection = f'dbname=%s host=%s user=%s password=%s port=%s' % (
    DB_DATABASE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT)
connection = psycopg.connect(db_connection)
cursor = connection.cursor()

today_dt = datetime.datetime.now()
year = today_dt.year
month = today_dt.month
day = today_dt.day

next_day_dt = today_dt + datetime.timedelta(days=1)
tmr_year = next_day_dt.year
tmr_month = next_day_dt.month
tmr_day = next_day_dt.day


def get_s3_uri(filepath):
    s3_uri_prefix = 's3://winnipeg-transit-static-data/daily/'
    return s3_uri_prefix + filepath


def format_date(date):
    hour, minute, second = date.split(":")

    is_next_day = int(hour) >= 24

    date_day = tmr_day if is_next_day else day
    date_month = tmr_month if is_next_day else month
    date_year = tmr_year if is_next_day else year

    hour = int(hour) - 24 if is_next_day else int(hour)
    hour = str(hour).zfill(2)

    return f'%s-%s-%s %s:%s:%s' % (date_year, date_month, date_day, hour, minute, second)


def lambda_handler(event, context):
    stop_times_df = pd.read_csv(get_s3_uri('stop_times.csv'))

    print('Formats arrival time...')
    stop_times_df['arrival_time'] = stop_times_df['arrival_time'].apply(
        format_date)

    print('Formats departure time...')
    stop_times_df['departure_time'] = stop_times_df['departure_time'].apply(
        format_date)

    sio = StringIO()
    sio.write(stop_times_df.to_csv(index=None, header=None))
    sio.seek(0)

    print('Batch inserts to PostgreSQL...')

    with cursor.copy("COPY stop_schedules FROM STDIN WITH (FORMAT CSV)") as copy:
        while data := sio.read():
            copy.write(data)

    connection.commit()

    return {
        'statusCode': 200,
    }
