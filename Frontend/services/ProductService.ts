import {
  GetAllProductsDataResponse,
  GetProductByIdDataResponse,
  GetSearchProductsDataResponse,
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
  return await AxiosGet<GetAllProductsDataResponse>(`/product/all/${page}`);
};

export const searchProducts = async (searchQuery: string) => {
  return await AxiosGet<GetSearchProductsDataResponse>(
    `/product/search/${searchQuery}`
  );
};
