import bcrypt from "bcrypt";
import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  email: string;
  password: string;
  username: string;
  verified: boolean;
  role: "admin" | "user";
}

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
  username: { type: String, required: true },
  password: { type: String, required: true, unique: true, trim: true },
  verified: { type: Boolean, default: false },
  role: { type: String, default: "user" },
});

// Hashing password before saving
userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(69);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

// Comparing password
userSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export const UserModel: Model<UserDocument> =
  models.User || model("User", userSchema);
