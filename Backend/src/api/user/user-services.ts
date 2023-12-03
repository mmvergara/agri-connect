import formidable from "formidable";
import { db } from "../../lib/db";
import { Req } from "../../types/express-types";
import { Cloudinary } from "../../cloudinary/cloudinary";

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
//   return productData;
// };

export const getUserProfileByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: {
        username: username,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
        products: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        ProductEndorsers: true,
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

// export const endorseProduct = async (
//   productID: string,
//   userID: string
// ): Promise<{ isEndorsed: boolean }> => {
//   try {
//     // Check first if like exists then delete it, else create it

//     const product = await db.productEndorsers.findFirst({
//       where: {
//         AND: [{ productID }, { userID }],
//       },
//     });

//     if (product) {
//       await db.productEndorsers.delete({
//         where: {
//           id: product.id,
//         },
//       });
//       return { isEndorsed: false };
//     } else {
//       await db.productEndorsers.create({
//         data: {
//           productID: productID,
//           userID: userID,
//         },
//       });
//       return { isEndorsed: true };
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error endorsing product");
//   }
// };

export const endorseUser = async (
  userBeingEndorsedID: string,
  userID: string
) => {
  try {
    const endorsement = await db.userEndorsers.findFirst({
      where: {
        AND: [{ userID }, { userBeingEndorsedID }],
      },
    });

    if (endorsement) {
      await db.userEndorsers.delete({
        where: {
          id: endorsement.id,
        },
      });
      return { isEndorsed: false };
    } else {
      await db.userEndorsers.create({
        data: {
          userBeingEndorsedID: userBeingEndorsedID,
          userID: userID,
        },
      });
      return { isEndorsed: true };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error endorsing user");
  }
};

export const parseChangeAvatarReq = async (req: Req) => {
  const form = formidable({ maxFileSize: 8 * 1024 * 1024 });
  const avatarUrl = await new Promise<string>((res, rej) => {
    form.parse(req, async (err, fields, files) => {
      console.log("1111111");
      if (err) return null;
      console.log("2222222");

      const uploadResponse = await Cloudinary.uploader.upload(
        files.avatar[0].filepath,
        { folder: "products" }
      );
      console.log("3333333");

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
