import ExpressLoader from "./express-loader";
import type { Express } from "express";

const MainLoader = async ({ app }: { app: Express }) => {
  console.log("= = = Loading Loaders...");
  await ExpressLoader({ app });
  console.log("= = = Loaders Loaded");
};

export default MainLoader;
