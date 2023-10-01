import { Req, Res } from "../types/express-types";
import {
  saveProductDb,
  parserCreateProductReq,
  getProduct,
} from "./product-services";
export const createProduct = async (req: Req, res: Res) => {
  try {
    const productData = await parserCreateProductReq(req);
    if (!productData) throw new Error("Error Uploading Image");
    const newProd = await saveProductDb(productData);
    return res.status(201).json({ data: newProd, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const getProductById = async (req: Req, res: Res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) throw new Error("Product not found");
    return res.status(200).json({ data: product, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};
