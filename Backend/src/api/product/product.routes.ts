import {
  getAllMostEndorsedProducts,
  getAllProducts,
  getProductById,
  getSearchProducts,
  postCreateProduct,
  postDeleteProduct,
  postEndorseProduct,
  postFetchProductsByUserId,
  postUpdateProductPrice,
} from "./product-controller";
import { isAuth } from "../../middleware/isAuth";
import type { Router } from "express";

export default (router: Router) => {
  router.get("/product/get/:id", getProductById);
  router.get("/product/all/:page", getAllProducts);
  router.get("/product/search/:search", getSearchProducts);
  router.get("/product/most-endorsed/:page", getAllMostEndorsedProducts);

  router.post("/product/create", isAuth, postCreateProduct);
  router.post("/product/user", isAuth, postFetchProductsByUserId);
  router.post("/product/delete", isAuth, postDeleteProduct);
  router.post("/product/price/update", isAuth, postUpdateProductPrice);
  router.post("/product/endorse", isAuth, postEndorseProduct);
};
