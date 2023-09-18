import formidable from "formidable";
import { productModel } from "../models/product-model";
import { Req } from "../types/express-types";
import { Cloudinary } from "../cloudinary/cloudinary";

type ProductData = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productPricePer: string;
  productImageUrl: string;
  productOwnerID: string;
};

export const parserCreateProductReq = async (req: Req) => {
  const form = formidable({ maxFileSize: 8 * 1024 * 1024 });
  const productData = await new Promise<ProductData>((res, rej) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return null;
      const uploadResponse = await Cloudinary.uploader.upload(
        files.productImage[0].filepath,
        { folder: "products" }
      );
      const productData = {};
      for (let key in fields) productData[key] = fields[key][0];
      productData["productOwnerID"] = req.session.user_id;
      productData["productImageUrl"] = uploadResponse.secure_url;
      res(productData as ProductData);
    });
  });
  return productData;
};

export const saveProductDb = async (ProductData: ProductData) => {
  try {
    console.log(ProductData);
    const newProduct = await productModel.create(ProductData);
    const savedProd = await newProduct.save();
    return savedProd;
  } catch (error) {
    console.log(error);
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Error creating product");
  }
};

export const getProducts = async (skipBy: number) => {
  try {
    const products = await productModel
      .find()
      .sort({
        createdAt: -1,
      })
      .skip(skipBy)
      .limit(30);
    return products;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

