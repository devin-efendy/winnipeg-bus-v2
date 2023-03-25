-- CreateTable
CREATE TABLE "stop_times" (
    "trip_id" INTEGER NOT NULL,
    "arrival_time" TIMESTAMP(6) NOT NULL,
    "departure_time" TIMESTAMP(6) NOT NULL,
    "stop_id" INTEGER NOT NULL,
    "stop_sequence" INTEGER NOT NULL,

    CONSTRAINT "pk_stop_times_id" PRIMARY KEY ("stop_id","trip_id")
);

-- CreateTable
CREATE TABLE "stops" (
    "stop_id" INTEGER NOT NULL,
    "stop_code" INTEGER NOT NULL,
    "stop_name" TEXT NOT NULL,
    "stop_lat" TEXT NOT NULL,
    "stop_lon" TEXT NOT NULL,
    "stop_url" TEXT NOT NULL,
    "routes" TEXT[],

    CONSTRAINT "stops_pkey" PRIMARY KEY ("stop_id")
);

-- CreateTable
CREATE TABLE "trips" (
    "route_id" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "trip_headsign" TEXT NOT NULL,
    "direction_id" INTEGER NOT NULL,
    "block_id" TEXT NOT NULL,
    "shape_id" INTEGER NOT NULL,
    "wheelchair_accessible" INTEGER NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "routes" (
    "route_id" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "long_name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("route_id")
);
