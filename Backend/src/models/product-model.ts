import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import { productDbData } from "../shared-types/db-model-types";

type ProductDocument = Document & productDbData;

interface Methods {
  comparePassword: (password: string) => Promise<boolean>;
}

const productSchema = new Schema<ProductDocument, {}, Methods>({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImageUrl: { type: String, required: true },
  productOwnerID: { type: String, required: true },
  productInStock: { type: Boolean, required: true, default: true },
  productPricePer: { type: String, required: true },
});

export const productModel: Model<ProductDocument> =
  models.User || model("agriconnect-products", productSchema);
