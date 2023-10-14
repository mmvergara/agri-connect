import {
  GetProductByIdDataResponse,
  GetProductsDataResponse,
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
  return await AxiosGet<GetProductByIdDataResponse>(
    `/product/get/${productId}`
  );
};

export const getProducts = async (page: number) => {
  return await AxiosGet<GetProductsDataResponse>(`/product/all/${page}`);
};
