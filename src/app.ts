
import express from "express";
import { router } from "./routes";
import { AppDataSource } from "./database";

const port = 5500;
const app = express();
app.use(express.json());
app.use(router);

AppDataSource.initialize().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
});

export { app };
