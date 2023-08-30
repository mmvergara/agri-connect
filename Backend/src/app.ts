import express from "express";
import { PORT } from "./config";
const startServer = async () => {
  const app = express();

  (await import("./loaders")).default({ app });

  app
    .listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
};

startServer();
