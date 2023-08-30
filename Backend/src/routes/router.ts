import authenticationRoutes from "./auth-routes";
import type { Router } from "express";
import express from "express";

const router = express.Router();

export default (): Router => {
  authenticationRoutes(router);
  return router;
};
