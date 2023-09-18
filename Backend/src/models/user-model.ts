import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import { userDbData } from "../types/db-model-types";

type UserDocument = Document & userDbData;

const userSchema = new Schema<UserDocument, {}>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  avatarUrl: { type: String, default: "" },
  username: { type: String, required: true },
  verified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

export const UserModel: Model<UserDocument> =
  models.User || model("agriconnect-users", userSchema);
