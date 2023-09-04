import type { Express } from "express";
import { MONGODB_URL, MORGAN } from "../config";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import compression from "compression";
import session from "express-session";
import router from "../routes/router";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const ExpressLoader = async ({ app }: { app: Express }) => {
  app.get("/status", (req, res) => res.sendStatus(200).end());
  app.head("/status", (req, res) => res.sendStatus(200).end());

  app.use(helmet());
  console.log("CORS Enabled");
  app.use(cors());

  const store = MongoStore.create({
    mongoUrl: MONGODB_URL,
    collectionName: "sessions",
  });

  app.use(
    session({
      store,
      secret: "BOGARTYIWASHERE",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      },
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(MORGAN));
  app.use("/", router());
};

export default ExpressLoader;
