import { MORGAN, PORT } from "../config";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const ExpressLoader = async ({ app }: { app: Express }) => {
  console.log("- Loading express");
  app.get("/status", (req, res) => res.sendStatus(200).end());
  app.head("/status", (req, res) => res.sendStatus(200).end());

  app.enable("trust proxy");

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(MORGAN));
};

export default ExpressLoader;
