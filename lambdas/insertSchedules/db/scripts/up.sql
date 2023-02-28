DROP TABLE IF EXISTS stop_schedules;
CREATE TABLE stop_schedules (
  trip_id INT NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  stop_id INT NOT NULL,
  stop_sequence INT NOT NULL,
  CONSTRAINT pk_schedule_id PRIMARY KEY (stop_id, trip_id)
);
CREATE index idx_stop_id ON stop_schedules(stop_id)