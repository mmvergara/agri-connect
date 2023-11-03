import {
  GetAllConversationsDataResponse,
  PostGetConversationByUserIDataResponse,
  PostGetConversationByIDDataResponse,
} from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";


export const getConversationByUserId = async (
  userID2: GetConversationByUserIdFields,
) => {
  console.log("getConversation", userID2);
  return await AxiosPost<PostGetConversationByIDDataResponse>(
    "/conversation/getByUserId",
    { userID2 },
  );
};

export const getAllConversation = async () => {
  console.log("getAllConversation");
  return await AxiosGet<GetAllConversationsDataResponse>("conversation/all");
};

export const getConversationById = async (
  conversationID: GetConversationByIdFields,
) => {
  console.log("getConversationById", conversationID);
  return await AxiosPost<PostGetConversationByUserIDataResponse>(
    "conversation/getById",
    { conversationID },
  );
};


export const sendMessage = async (data: SendMessageFields) => {
  return await AxiosPost<PostGetConversationByUserIDataResponse>(
    "conversation/message/send",
    data,
  );
};
