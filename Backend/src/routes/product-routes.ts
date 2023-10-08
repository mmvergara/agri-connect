import {
  getProductById,
  postCreateProduct,
} from "../controllers/product-controller";
import { isAuth } from "../middleware/isAuth";
import type { Router } from "express";

export default (router: Router) => {
  router.post("/product/create", isAuth, postCreateProduct);
  router.get("/product/:id", getProductById);
};
