import { MainLoader } from "./loaders/main-loader";
import { PORT } from "./config";
import express from "express";

const startServer = async () => {
  const app = express();
  
  // Load express, mongodb, etc
  await MainLoader({ app });

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
