import { endorserModel } from "../models/endorsement-model";
import { productModel } from "../models/product-model";
import { UserModel } from "../models/user-model";

export const getUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await UserModel.findOne({ username: username });
    return user;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};

export const get15MostRecentUserProduct = async (userId: string) => {
  try {
    const products = await productModel
      .find({ user: userId })
      .sort({
        createdAt: -1,
      })
      .limit(15);
    return products;
  } catch (error) {
    throw new Error("Server Error");
  }
};

export const getUserProducts = async (userId: string, skipBy: number) => {
  try {
    const products = await productModel
      .find({ user: userId })
      .sort({
        createdAt: -1,
      })
      .skip(skipBy)
      .limit(10);
    return products;
  } catch (error) {
    throw new Error("Server Error");
  }
};

export const getUserEndorsersCount = async (userId: string) => {
  try {
    const endorserCount = await endorserModel
      .find({ userBeingEndorsed: userId })
      .countDocuments();
    return endorserCount;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};

export const getUserEndorsers = async (userId: string) => {
  try {
    const endorser = await endorserModel
      .find({ userBeingEndorsed: userId })
      .populate("endorser");
    return endorser;
  } catch (error) {
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};

export const endorseUser = async (
  endorserId: string,
  userBeingEndorsedId: string
) => {
  try {
    // Create new endorser
    const newEndorser = await endorserModel.create({
      endorser: endorserId,
      userBeingEndorsed: userBeingEndorsedId,
    });
    const savedEndorser = await newEndorser.save();
    return savedEndorser;
  } catch (error) {
    console.log(error);
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};

export const removeEndorsement = async (
  endorserId: string,
  userBeingEndorsedId: string
) => {
  try {
    // Create new endorser
    const removedEndorsement = await endorserModel.deleteOne({
      endorser: endorserId,
      userBeingEndorsed: userBeingEndorsedId,
    });
    return removedEndorsement;
  } catch (error) {
    console.log(error);
    // We are throwing an error here because we want to handle it in the controller
    throw new Error("Server Error");
  }
};
