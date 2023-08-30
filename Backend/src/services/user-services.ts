import { UserModel } from "../models/user-model";

export const getUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};
