// get all products
// get product by id

// create product

// update product
// update product status

// delete product

import { createProduct } from "../controllers/product-controller";
import { isAuth } from "../middleware/isAuth";
import type { Router } from "express";

export default (router: Router) => {
  router.post("/product/create", isAuth, createProduct);
};
