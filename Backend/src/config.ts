import dotenv from "dotenv";
const envFound = dotenv.config();

if (!envFound) throw new Error("Couldn't find .env file");
if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL ENV is not defined");
export const PORT = process.env.PORT || 3000;
export const MONGODB_URL = process.env.MONGODB_URL;

export const MORGAN = process.env.MORGAN || "";
