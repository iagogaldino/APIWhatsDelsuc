
import express from "express";
import { router } from "./routes";
import { AppDataSource } from "./database";

const app = express();
app.use(express.json());
app.use(router);

AppDataSource.initialize().then(() => {
  app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
  });
});

export { app };
