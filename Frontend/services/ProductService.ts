import { ProductData } from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";

export const createProduct = async (productData: FormData) => {
  return await AxiosPost<ProductData>("/product/create", productData, true);
};

export const getProductById = async (productId: string) => {
  return await AxiosGet<ProductData>(`/product/${productId}`);
};
