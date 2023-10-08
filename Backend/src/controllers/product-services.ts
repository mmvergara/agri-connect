import formidable from "formidable";
import { productModel } from "../models/product-model";
import { Req } from "../types/express-types";
import { Cloudinary } from "../cloudinary/cloudinary";
import { PrismaClient } from "@prisma/client";

type ProductData = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productPricePer: string;
  productImageUrl: string;
  productOwnerID: string;
};
const db = new PrismaClient();
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
      productData["productPrice"] = parseInt(productData["productPrice"]);
      res(productData as ProductData);
    });
  });
  console.log(productData);
  return productData;
};
export const createProduct = async (ProductData: ProductData) => {
  try {
    return await db.product.create({
      data: {
        productDescription: ProductData.productDescription,
        productImageUrl: ProductData.productImageUrl,
        productName: ProductData.productName,
        productPrice: ProductData.productPrice,
        productPricePer: ProductData.productPricePer,
        productOwner: {
          connect: {
            userID: ProductData.productOwnerID,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    // We are not handling the error here because we are handling it in the controller
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

export const getProduct = async (productID: string) => {
  return db.product.findUnique({
    where: { productID },
  });
};
