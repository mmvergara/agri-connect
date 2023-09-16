import ExpressLoader from "./express-loader";
import type { Express } from "express";
import MongodbLoader from "./mongodb-loader";

export const MainLoader = async ({ app }: { app: Express }) => {
  console.log("= = = Loading Loaders...");
  await ExpressLoader({ app });
  await MongodbLoader();
  console.log("= = = Loaders Loaded");
};
