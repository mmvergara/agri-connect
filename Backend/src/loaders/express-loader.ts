import type { Express } from "express";
import { MONGODB_URL, MORGAN } from "../config";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import compression from "compression";
import session from "express-session";
import mongoSession from "connect-mongodb-session";
import router from "../routes/router";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const MongoDBSession = mongoSession(session);
const ExpressLoader = async ({ app }: { app: Express }) => {
  app.get("/status", (req, res) => res.sendStatus(200).end());
  app.head("/status", (req, res) => res.sendStatus(200).end());

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  const store = new MongoDBSession({
    uri: MONGODB_URL,
    collection: "authSession",
  });
  app.use(
    session({
      store: store,
      secret: "BOGARTYIWASHERE",
      resave: false,
      saveUninitialized: false,
      cookie: {
        // maxAge: 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60,
        httpOnly: true,
      },
    })
  );
  app.use(compression());

  app.use(morgan(MORGAN));
  app.use("/", router());
};

export default ExpressLoader;
