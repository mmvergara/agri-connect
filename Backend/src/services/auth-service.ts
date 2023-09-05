import { RegisterFields } from "../shared-types/auth-types";
import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";

export const createUser = async (user: RegisterFields) => {
  try {
    const { email, password, username } = user;
    const newUser = await UserModel.create({
      email,
      password: await bcrypt.hash(password, 10),
      username,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
};

export const validatePassword = async (p1: string, p2: string) => {
  try {
    const res = await bcrypt.compare(p1, p2);
    if (!res) throw new Error("Invalid Password");
  } catch (error) {
    throw new Error("Error Validating password");
  }
};
