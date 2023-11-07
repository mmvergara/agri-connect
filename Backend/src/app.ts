import { MainLoader } from "./loaders/main-loader";
import { PORT } from "./config";
import express from "express";
import { Server } from "socket.io";
import { getSocket, initSocket } from "./utilities/socket";

const startServer = async () => {
  const app = express();

  // Load express, mongodb, etc
  await MainLoader({ app });

  const expressServer = app
    .listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });

  initSocket(expressServer);

  const io = getSocket();

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
};

startServer();
