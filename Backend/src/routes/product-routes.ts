import {
  getAllProducts,
  getProductById,
  postCreateProduct,
} from "../controllers/product-controller";
import { isAuth } from "../middleware/isAuth";
import type { Router } from "express";

export default (router: Router) => {
  router.post("/product/create", isAuth, postCreateProduct);
  router.get("/product/get/:id", getProductById);
  router.get("/product/all/:page", getAllProducts);
};
