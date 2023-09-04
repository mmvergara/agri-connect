import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import { userDbData } from "../types/shared-types/DB-Model-Types";

type UserDocument = Document & userDbData;

interface Methods {
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
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
  role: { type: String, default: "user" },
});

export const UserModel: Model<UserDocument> =
  models.User || model("User", userSchema);
