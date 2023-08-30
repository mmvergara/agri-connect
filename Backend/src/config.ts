import dotenv from "dotenv";
const envFound = dotenv.config();

if (!envFound) throw new Error("Couldn't find .env file");
if (!process.env.PORT) throw new Error("PORT ENV is not defined");
export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/agriconnect";

export const MORGAN = process.env.MORGAN || ""
