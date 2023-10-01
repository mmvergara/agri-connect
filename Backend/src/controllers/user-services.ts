import { PrismaClient } from "@prisma/client";
import { endorserModel } from "../models/endorsement-model";
import { productModel } from "../models/product-model";
import { UserModel } from "../models/user-model";
import { db } from "../lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Server Error");
  }
};
