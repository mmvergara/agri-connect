import { LoginFields, UserData } from "@/types/shared-types/auth-types";
import { ApiErr, ApiRes } from "@/types";
import { AxiosPost } from "./AxiosInstance";

export const Login = async (
  userData: LoginFields
): Promise<ApiRes<UserData>> => {
  try {
    const { data } = await AxiosPost<UserData>("/auth/login", userData);
    return { data, error: null };
  } catch (error) {
    const err = error as ApiErr;
    return {
      data: null,
      error: err.response?.data.error || "Something wen't wrong",
    };
  }
};
