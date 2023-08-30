import mongoose from "mongoose";

const MongodbLoader = async () => {
  console.log("- Loading mongodb");
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error: " + err);
  });
}


var db = mongoose.connection;
