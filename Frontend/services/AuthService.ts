import {
  LoginFields,
  RegisterFields,
  LoggedInUserData,
  PostLoginDataResponse,
  PostLogoutDataResponse,
} from "@/types/shared-types";
import { AxiosPost } from "./AxiosInstance";

export const Login = async (userData: LoginFields) => {
  return await AxiosPost<LoggedInUserData>("/auth/login", userData);
};

export const Register = async (userData: RegisterFields) => {
  return await AxiosPost<PostLoginDataResponse>("/auth/register", userData);
};

export const Logout = async () => {
  return await AxiosPost<PostLogoutDataResponse>("/auth/logout", {});
};
