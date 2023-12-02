import type { Express } from "express";
import { MONGODB_URL, MORGAN } from "../config";
import cookieParser from "cookie-parser";
import compression from "compression";
import session from "express-session";
import mongoSession from "connect-mongodb-session";
import router from "../api/router";
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
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser());
  const store = new MongoDBSession({
    uri: MONGODB_URL,
    collection: "authSession",
  });
  app.use(
    session({
      name: "sid",
      store: store,
      secret: "BOGARTYIWASHERE",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      },
    })
  );
  app.use(compression());

  app.use(morgan(MORGAN));
  app.use("/", router());
};

export default ExpressLoader;
