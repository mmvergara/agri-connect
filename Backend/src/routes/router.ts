import authenticationRoutes from "./auth-routes";
import type { Router } from "express";
import express from "express";
import productRoutes from "./product-routes";

const router = express.Router();

export default (): Router => {
  authenticationRoutes(router);
  productRoutes(router);
  return router;
};
