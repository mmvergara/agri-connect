import { Req, Res } from "../types/express-types";
import { saveProductDb, parserCreateProductReq } from "./product-services";
export const createProduct = async (req: Req, res: Res) => {
  try {
    const productData = await parserCreateProductReq(req);
    if (!productData) throw new Error("Error Uploading Image");

    const newProd = await saveProductDb(productData);
    console.log(newProd)
    return res.status(201).json({ data: newProd, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};
