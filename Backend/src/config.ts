import dotenv from "dotenv";
const envFound = dotenv.config();

if (!envFound) throw new Error("Couldn't find .env file");
if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL ENV is not defined");

if (!process.env.CLOUDINARY_CLOUD_NAME)
  throw new Error("CLOUDINARY_CLOUD_NAME ENV is not defined");
if (!process.env.CLOUDINARY_API_KEY)
  throw new Error("CLOUDINARY_API_KEY ENV is not defined");
if (!process.env.CLOUDINARY_API_SECRET)
  throw new Error("CLOUDINARY_API_SECRET ENV is not defined");

export const PORT = process.env.PORT || 3000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const MORGAN = process.env.MORGAN || "";

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
