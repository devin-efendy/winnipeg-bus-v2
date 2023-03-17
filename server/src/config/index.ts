const TransitApiConfig = {
  Url: process.env.TRANSIT_API_URL ?? '',
  Secret: process.env.TRANSIT_API_SECRET ?? '',
};

const DbConfig = {
  Database: process.env.DB_DATABASE,
  Username: process.env.DB_USERNAME,
  Password: process.env.DB_PASSWORD,
  Host: process.env.DB_HOST,
  Port: process.env.DB_PORT,
};

export { TransitApiConfig, DbConfig };
