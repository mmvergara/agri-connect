import {
  GetProductByIdDataResponse,
  PostCreateProductDataResponse,
} from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";

export const createProduct = async (productData: FormData) => {
  return await AxiosPost<PostCreateProductDataResponse>(
    "/product/create",
    productData,
    true
  );
};

export const getProductById = async (productId: string) => {
  return await AxiosGet<GetProductByIdDataResponse>(`/product/${productId}`);
};
