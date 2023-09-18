import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import { recommendationDbData } from "../types/db-model-types";

type RecommendationDocument = Document & recommendationDbData;

const recommendationSchema = new Schema<RecommendationDocument, {}>({
  recommender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "agriconnect-users",
  },
  productBeingRecommended: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "agriconnect-products",
  },
});

export const recommendationModel: Model<RecommendationDocument> =
  models.User || model("agriconnect-recommendations", recommendationSchema);
