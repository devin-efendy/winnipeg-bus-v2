import pandas as pd

def get_s3_uri(filepath):
    s3_uri_prefix = 's3://winnipeg-transit-static-data/daily/'
    return s3_uri_prefix + filepath


def lambda_handler(event, context):
    stop_times_df = pd.read_csv(get_s3_uri('stop_times.csv'))
    trips_df = pd.read_csv(get_s3_uri('trips.csv'))
    routes_df = pd.read_csv(get_s3_uri('routes.csv'))
    stops_df = pd.read_csv(get_s3_uri('stops.csv'))

    routes = {}

    for id in stops_df['stop_id'].values:
        filtered_trips = stop_times_df.query(f'stop_id == %s' % id)
        filtered_trip_ids = filtered_trips['trip_id'].tolist()
        matched_trip_ids = trips_df.query('trip_id in @filtered_trip_ids')
        filtered_routes = matched_trip_ids['route_id'].unique()

        routes[int(id)] = filtered_routes.tolist()

        filtered_routes = routes_df.query('route_id in @filtered_routes')

    return {
        'statusCode': 200,
        'body': {
            'stop_routes': routes
        }
    }
