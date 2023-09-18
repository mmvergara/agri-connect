import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import { productDbData } from "../types/db-model-types";

type ProductDocument = Document & productDbData;

const productSchema = new Schema<ProductDocument, {}>({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productOwner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "agriconnect-users",
  },
  productPrice: { type: Number, required: true },
  productImageUrl: { type: String, required: true },
  productInStock: { type: Boolean, required: true, default: true },
  productPricePer: { type: String, required: true },
});

export const productModel: Model<ProductDocument> =
  models.User || model("agriconnect-products", productSchema);
