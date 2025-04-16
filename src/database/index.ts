import { DataSource } from "typeorm";
import { Session } from "../entities/Session";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "whatsapp_api",
  entities: [Session],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false // Permite SSL mesmo sem certificado válido (ex: em ambientes dev ou Render)
  }
};


console.log(config);

export const AppDataSource = new DataSource(config);
