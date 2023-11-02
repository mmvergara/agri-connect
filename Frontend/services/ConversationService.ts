import {
  GetAllConversationsDataResponse,
  GetAllProductsDataResponse,
  GetProductByIdDataResponse,
  GetSearchProductsDataResponse,
  PostCreateProductDataResponse,
  PostGetConversationDataResponse,
} from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";

export const getConversation = async (userID: string) => {
  return await AxiosPost<PostGetConversationDataResponse>("conversation/get", {
    userID2: userID,
  });
};

export const getAllConversation = async () => {
  return await AxiosGet<GetAllConversationsDataResponse>("conversation/all");
};
