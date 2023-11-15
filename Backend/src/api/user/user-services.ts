import formidable from "formidable";
import { db } from "../../lib/db";
import { Req } from "../../types/express-types";
import { Cloudinary } from "../../cloudinary/cloudinary";

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

export const getUserByID = async (userID: string) => {
  try {
    return await db.user.findUnique({
      where: {
        userID: userID,
      },
    });
  } catch (error) {
    throw new Error("Server Error");
  }
};

export const deleteUserByID = async (userID: string) => {
  try {
    return await db.user.delete({
      where: {
        userID: userID,
      },
    });
  } catch (error) {
    throw new Error("Server Error");
  }
};

// import formidable from "formidable";
// import { productModel } from "../models/product-model";
// import { Req } from "../types/express-types";
// import { Cloudinary } from "../cloudinary/cloudinary";
// import { PrismaClient } from "@prisma/client";

// type ProductData = {
//   productName: string;
//   productDescription: string;
//   productPrice: number;
//   productPricePer: string;
//   productImageUrl: string;
//   productOwnerID: string;
// };
// const db = new PrismaClient();
// export const parserCreateProductReq = async (req: Req) => {
//   const form = formidable({ maxFileSize: 8 * 1024 * 1024 });
//   const productData = await new Promise<ProductData>((res, rej) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) return null;
//       const uploadResponse = await Cloudinary.uploader.upload(
//         files.productImage[0].filepath,
//         { folder: "products" }
//       );
//       const productData = {};
//       for (let key in fields) productData[key] = fields[key][0];
//       productData["productOwnerID"] = req.session.user_id;
//       productData["productImageUrl"] = uploadResponse.secure_url;
//       productData["productPrice"] = parseInt(productData["productPrice"]);
//       res(productData as ProductData);
//     });
//   });
//   console.log(productData);
//   return productData;
// };

export const parseChangeAvatarReq = async (req: Req) => {
  const form = formidable({ maxFileSize: 8 * 1024 * 1024 });
  const avatarUrl = await new Promise<string>((res, rej) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return null;
      const uploadResponse = await Cloudinary.uploader.upload(
        files.avatar[0].filepath,
        { folder: "avatars" }
      );
      res(uploadResponse.secure_url);
    });
  });
  return avatarUrl;
};

export const changeUserAvatarUrl = async (
  avatarUrl: string,
  userID: string
) => {
  try {
    return await db.user.update({
      where: {
        userID: userID,
      },
      data: {
        avatarUrl: avatarUrl,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};
