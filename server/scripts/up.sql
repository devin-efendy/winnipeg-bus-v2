DROP TABLE IF EXISTS stop_times;
CREATE TABLE stop_times (
  trip_id INT NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  stop_id INT NOT NULL,
  stop_sequence INT NOT NULL,
  CONSTRAINT pk_stop_times_id PRIMARY KEY (stop_id, trip_id)
);
DROP TABLE IF EXISTS trips;
CREATE TABLE trips (
  route_id TEXT NOT NULL,
  service_id INT NOT NULL,
  trip_id INT PRIMARY KEY NOT NULL,
  trip_headsign TEXT NOT NULL,
  direction_id INT NOT NULL,
  block_id TEXT NOT NULL,
  shape_id INT NOT NULL,
  wheelchair_accessible INT NOT NULL
);
-- CREATE index idx_stop_id ON stop_times(stop_id);
DROP TABLE IF EXISTS stops;
CREATE TABLE stops (
  stop_id INT PRIMARY KEY NOT NULL,
  stop_code INT NOT NULL,
  stop_name TEXT NOT NULL,
  stop_lat TEXT NOT NULL,
  stop_lon TEXT NOT NULL,
  stop_url TEXT NOT NULL,
  routes TEXT [] NOT NULL
);