import type { Express } from "express";
import { MORGAN } from "../config";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "../routes/router";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const ExpressLoader = async ({ app }: { app: Express }) => {
  app.get("/status", (req, res) => res.sendStatus(200).end());
  app.head("/status", (req, res) => res.sendStatus(200).end());

  app.enable("trust proxy");

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(
    cors({
      credentials: true,
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
