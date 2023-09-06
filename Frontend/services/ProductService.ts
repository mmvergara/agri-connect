import { AxiosPost } from "./AxiosInstance";
import { ApiErr } from "@/types";

export const createProduct = async (productData: FormData) => {
  try {
    const res = await AxiosPost("/product/create", productData, true);
    return res.data;
  } catch (error) {
    const err = error as ApiErr;
    return {
      data: null,
      error: err.response?.data.error || "Something wen't wrong",
    };
  }
};
