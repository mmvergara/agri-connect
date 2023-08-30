import { MONGODB_URI } from "@/config";
import mongoose from "mongoose";

let connection: typeof mongoose;

export const connectDb = async () => {
  if (!connection) {
    connection = await mongoose.connect(MONGODB_URI);
  }
  return connection;
};
