
import { DataSource } from "typeorm";
import { Session } from "../entities/Session";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Session],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false
  }
});
