import { GetUserProfileDataResponse } from "@/types/shared-types";
import { AxiosGet } from "./AxiosInstance";

export const getUserProfileByUsername = async (username: string) => {
  return await AxiosGet<GetUserProfileDataResponse>(`/user/${username}`);
};
