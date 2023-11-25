import formidable from "formidable";
import { productModel } from "../../models/product-model";
import { Req } from "../../types/express-types";
import { Cloudinary } from "../../cloudinary/cloudinary";
import { PrismaClient } from "@prisma/client";

type ProductData = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productPricePer: string;
  productImageUrl: string;
  productOwnerID: string;
};
const db = new PrismaClient();
export const parserCreateProductReq = async (req: Req) => {
  const form = formidable({ maxFileSize: 8 * 1024 * 1024 });
  const productData = await new Promise<ProductData>((res, rej) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return null;
      const uploadResponse = await Cloudinary.uploader.upload(
        files.productImage[0].filepath,
        { folder: "products" }
      );
      const productData = {};
      for (let key in fields) productData[key] = fields[key][0];
      productData["productOwnerID"] = req.session.user_id;
      productData["productImageUrl"] = uploadResponse.secure_url;
      productData["productPrice"] = parseInt(productData["productPrice"]);
      res(productData as ProductData);
    });
  });
  return productData;
};
export const createProduct = async (ProductData: ProductData) => {
  try {
    return await db.product.create({
      data: {
        productDescription: ProductData.productDescription,
        productImageUrl: ProductData.productImageUrl,
        productName: ProductData.productName,
        productPrice: ProductData.productPrice,
        productPricePer: ProductData.productPricePer,
        productOwner: {
          connect: {
            userID: ProductData.productOwnerID,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error creating product");
  }
};

export const getRecentProducts = async (pageNumber: number) => {
  pageNumber -= 1;
  const take = 20;
  try {
    const products = await db.product.findMany({
      skip: pageNumber * take,
      take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        productEndorsers: true,
        productOwner: true,
      },
    });
    return products;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const getProduct = async (productID: string) => {
  try {
    return db.product.findUnique({
      where: { productID },
      include: {
        productEndorsers: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const searchProductByQuery = async (search: string) => {
  console.log("yo");
  try {
    return db.product.findMany({
      where: {
        productName: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
};

// export const likeComment = async (
//   commentID: string,
//   userID: string
// ): Promise<{ isLiked: boolean }> => {
//   try {
//     // Check first if like exists then delete it, else create it

//     const comment = await db.postCommentsLikes.findFirst({
//       where: {
//         AND: [{ commentID }, { userID }],
//       },
//     });

//     if (comment) {
//       await db.postCommentsLikes.delete({
//         where: {
//           id: comment.id,
//         },
//       });
//       return { isLiked: false };
//     } else {
//       await db.postCommentsLikes.create({
//         data: {
//           commentID: commentID,
//           userID: userID,
//         },
//       });
//       return { isLiked: true };
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error liking comment");
//   }
// };

export const endorseProduct = async (
  productID: string,
  userID: string
): Promise<{ isEndorsed: boolean }> => {
  try {
    // Check first if like exists then delete it, else create it

    const product = await db.productEndorsers.findFirst({
      where: {
        AND: [{ productID }, { userID }],
      },
    });

    if (product) {
      await db.productEndorsers.delete({
        where: {
          id: product.id,
        },
      });
      return { isEndorsed: false };
    } else {
      await db.productEndorsers.create({
        data: {
          productID: productID,
          userID: userID,
        },
      });
      return { isEndorsed: true };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error endorsing product");
  }
};
