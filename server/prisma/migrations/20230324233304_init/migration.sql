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

    CONSTRAINT "routes_pkey" PRIMARY KEY ("long_name")
);
