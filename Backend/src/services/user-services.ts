import { UserModel } from "../models/user-model";

export const getUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Error fetching data");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Error fetching data");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Error fetching data");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await UserModel.findOne({ username: username });
    return user;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Error fetching data");
  }
};
