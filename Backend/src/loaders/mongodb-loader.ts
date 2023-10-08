import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

const MongodbLoader = async () => {
  // try {
  //   mongoose.connect(MONGODB_URL, {
  //     replicaSet: "rs0",
  //   });
  //   mongoose.connection.on("connected", () => {
  //     console.log("MongoDB connection established");
  //   });
  //   mongoose.connection.on("error", (err) => {
  //     console.log("MongoDB connection error: " + err);
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export default MongodbLoader;
