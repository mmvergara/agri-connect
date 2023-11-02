import {
  GetAllConversationsDataResponse,
  PostGetConversationByUserIDataResponse,
  PostGetConversationByIDDataResponse,
} from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";

export const getConversationByUserId = async (userID: string) => {
  console.log("getConversation", userID);
  return await AxiosPost<PostGetConversationByIDDataResponse>(
    "/conversation/getByUserId",
    {
      userID2: userID,
    },
  );
};

export const getAllConversation = async () => {
  console.log("getAllConversation");
  return await AxiosGet<GetAllConversationsDataResponse>("conversation/all");
};

export const getConversationById = async (conversationID: string) => {
  console.log("getConversationById", conversationID);
  return await AxiosPost<PostGetConversationByUserIDataResponse>(
    "conversation/getById",
    {
      conversationID: conversationID,
    },
  );
};
