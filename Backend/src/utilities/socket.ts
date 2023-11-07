import { IncomingMessage, ServerResponse, Server } from "http";
import { Server as socketServer } from "socket.io";

// This is just for the type
const x = new socketServer();
// This is just for the type

let io: typeof x | null = null;

const initSocket = (
  httpServer: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  io = new socketServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
};

const getSocket = () => {
  if (!io) {
    throw new Error("Socket IO is not initialized");
  }
  return io;
};

export { initSocket, getSocket };
