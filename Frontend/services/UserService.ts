import { GetUserProfileDataResponse } from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";

export const getUserProfileByUsername = async (username: string) => {
  return await AxiosGet<GetUserProfileDataResponse>(`/user/${username}`);
};

export const endorseUser = async (userBeingEndorsedID: string) => {
  return await AxiosPost<{ isEndorsed: boolean }>(`/user/endorse`, {
    userBeingEndorsedID,
  });
};
