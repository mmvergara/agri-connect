import { db } from "../lib/db";

export const getUserProfileByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: {
        username: username,
      },
      include: {
        _count: {
          select: {
            ProductEndorsers: true,
            products: true,
          },
        },
        products: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });
  } catch (error) {
    throw new Error("Server Error");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    throw new Error("Server Error");
  }
};
