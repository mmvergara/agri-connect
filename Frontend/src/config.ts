if (process.env.MONGODB_URI == null) throw new Error("MONGODB_URI is not set");
export const MONGODB_URI = process.env.MONGODB_URI;
