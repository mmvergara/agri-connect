import {
  GetProductByIdDataResponse,
  GetProductsDataResponse,
  PostCreateProductDataResponse,
} from "../shared-types";
import { Req, Res } from "../types/express-types";
import {
  parserCreateProductReq,
  getProduct,
  createProduct,
  getRecentProducts,
} from "./product-services";

export const postCreateProduct = async (req: Req, res: Res) => {
  try {
    const productData = await parserCreateProductReq(req);
    if (!productData) throw new Error("Error Uploading Image");
    const data: PostCreateProductDataResponse = await createProduct(
      productData
    );
    return res.status(201).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const getProductById = async (req: Req, res: Res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) throw new Error("Product not found");
    let data: GetProductByIdDataResponse = product;
    return res.status(200).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const getAllProducts = async (req: Req, res: Res) => {
  try {
    const page = parseInt(req.params.page as string) || 0;
    const products = await getRecentProducts(page);
    if (products.length === 0) throw new Error("No products found");
    let data: GetProductsDataResponse = products;
    console.log(data);
    return res.status(200).json({ data, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};
