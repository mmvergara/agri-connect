import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import { endorserDbData } from "../types/db-model-types";

type EndorsementDocument = Document & endorserDbData;

const endorserSchema = new Schema<EndorsementDocument, {}>({
  endorser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "agriconnect-users",
  },
  userBeingEndorsed: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "agriconnect-users",
  },
});

export const endorserModel: Model<EndorsementDocument> =
  models.User || model("agriconnect-endorsements", endorserSchema);
