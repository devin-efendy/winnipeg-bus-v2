import pandas as pd
import psycopg
from dotenv import load_dotenv
import os
from io import StringIO

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


def to_pg_str_array(items):
    return '{' + ','.join([str(item) for item in items]) + '}'


def get_s3_uri(filepath):
    s3_uri_prefix = 's3://winnipeg-transit-static-data/daily/'
    return s3_uri_prefix + filepath


def lambda_handler(event, context):
    print("Fetching data from S3...")
    stop_times_df = pd.read_csv(get_s3_uri('stop_times.csv'))
    trips_df = pd.read_csv(get_s3_uri('trips.csv'))
    routes_df = pd.read_csv(get_s3_uri('routes.csv'))
    stops_df = pd.read_csv(get_s3_uri('stops.csv'))

    print("Parsing data...")

    routes = []

    grouped_stops_df = stop_times_df.groupby('stop_id')

    for stop_id in grouped_stops_df.groups:
        stop_trip_ids = grouped_stops_df.get_group(stop_id)['trip_id'].values
        matched_trip_ids = trips_df[trips_df['trip_id'].isin(stop_trip_ids)]
        stop_routes = matched_trip_ids['route_id'].unique()
        routes.append(stop_routes.tolist())

    stops_df['routes'] = [to_pg_str_array(route) for route in routes]

    sio = StringIO()
    sio.write(stops_df.to_csv(index=None, header=None))
    sio.seek(0)

    print("Copying to DB...")
    with cursor.copy("COPY transit_stops FROM STDIN WITH (FORMAT CSV)") as copy:
        while data := sio.read():
            copy.write(data)

    connection.commit()

    return {
        'statusCode': 200,
    }
