import {
  GetAllProductsDataResponse,
  GetProductByIdDataResponse,
  GetSearchProductsDataResponse,
  PostCreateProductDataResponse,
  ProductData,
} from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";

export const createProduct = async (productData: FormData) => {
  return await AxiosPost<PostCreateProductDataResponse>(
    "/product/create",
    productData,
    true,
  );
};

export const getProductById = async (productId: string) => {
  return await AxiosGet<GetProductByIdDataResponse>(
    `/product/get/${productId}`,
  );
};

export const endorseProduct = async (productID: string) => {
  return await AxiosPost<{ isEndorsed: boolean }>(`/product/endorse/`, {
    productID,
  });
};

export const getProductByUserId = async (userID: string) => {
  return await AxiosPost<GetAllProductsDataResponse>(`/product/user/`, {
    userID,
  });
};

export const getProducts = async (page: number) => {
  return await AxiosGet<GetAllProductsDataResponse>(`/product/all/${page}`);
};

export const deleteProductByID = async (productID: string) => {
  return await AxiosPost(`/product/delete/`, {
    productID,
  });
};

export const updateProductPrice = async (
  productID: string,
  newPrice: number,
) => {
  return await AxiosPost<ProductData>(`/product/price/update/`, {
    productID,
    newPrice,
  });
};

export const searchProducts = async (searchQuery: string) => {
  return await AxiosGet<GetSearchProductsDataResponse>(
    `/product/search/${searchQuery}`,
  );
};
