import {
  getAllProducts,
  getProductById,
  getSearchProducts,
  postCreateProduct,
  postEndorseProduct,
} from "./product-controller";
import { isAuth } from "../../middleware/isAuth";
import type { Router } from "express";

export default (router: Router) => {
  router.post("/product/create", isAuth, postCreateProduct);
  router.get("/product/get/:id", getProductById);
  router.get("/product/all/:page", getAllProducts);
  router.get("/product/search/:search", getSearchProducts);

  router.post("/product/endorse", isAuth, postEndorseProduct);
};
