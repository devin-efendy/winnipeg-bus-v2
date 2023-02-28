import pandas as pd
import psycopg
from io import StringIO
from datetime import datetime

today_date = datetime.now().date()
year = today_date.year
month = today_date.month
day = today_date.day


def get_s3_uri(filepath):
    s3_uri_prefix = 's3://winnipeg-transit-static-data/daily/'
    return s3_uri_prefix + filepath


def format_date(date):
    hour, minute, second = date.split(":")

    is_next_day = int(hour) >= 24

    hour = int(hour) - 24 if is_next_day else int(hour)
    hour = str(hour).zfill(2)

    new_day = day + 1 if is_next_day else day

    return f'%s-%s-%s %s:%s:%s' % (year, month, new_day, hour, minute, second)


def lambda_handler(event, context):
    stop_times_df = pd.read_csv(get_s3_uri('stop_times.csv'))

    print('Formats arrival time...')
    stop_times_df['arrival_time'] = stop_times_df['arrival_time'].apply(
        format_date)

    print('Formats departure time...')
    stop_times_df['departure_time'] = stop_times_df['departure_time'].apply(
        format_date)

    connection = psycopg.connect(
        "dbname=transit-schedule host=localhost user=postgres password=postgres port=5432")
    cursor = connection.cursor()

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
