import { RegisterFields } from "../../shared-types";
import bcrypt from "bcrypt";
import { db } from "../../lib/db";

export const createUser = async (user: RegisterFields) => {
  try {
    await db.user.create({
      data: {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error("Error creating user");
  }
};

export const checkIfEmailExists = async (email: string) => {
  return await db.user.count({
    where: {
      email,
    },
  });
};

export const checkIfUsernameExists = async (username: string) => {
  return await db.user.count({
    where: {
      username,
    },
  });
};

export const validatePassword = async (p1: string, p2: string) => {
  const res = await bcrypt.compare(p1, p2);
  if (!res) throw new Error("Invalid Password");
};

export const changePassword = async (userID: string, newPassword: string) => {
  try {
    await db.user.update({
      where: {
        userID,
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });
  } catch (error) {
    throw new Error("Error changing password");
  }
};
