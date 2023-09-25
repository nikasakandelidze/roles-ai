import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT) || 5433,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "rolesai-dev-db",
  entities: ["dist/**/**.entity{.js,.ts}"],
  synchronize: true,
  migrations: ["dist/**/**-migrations.js"],
  migrationsRun: false,
  logging: true,
  cli: {
    migrationsDir: "src/migrations",
  },
} as DataSourceOptions);

export default dataSource;

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
