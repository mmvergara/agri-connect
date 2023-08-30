import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

const MongodbLoader = async () => {
  console.log("- Loading mongodb");
  mongoose.connect(MONGODB_URL);
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error: " + err);
  });
};

var db = mongoose.connection;
