import {
  LoginFields,
  RegisterFields,
  UserData,
} from "@/types/shared-types/auth-types";
import { AxiosPost } from "./AxiosInstance";

export const Login = async (userData: LoginFields) => {
  return await AxiosPost<UserData>("/auth/login", userData);
};

export const Register = async (userData: RegisterFields) => {
  return await AxiosPost<UserData>("/auth/register", userData);
};

export const Logout = async () => {
  return await AxiosPost("/auth/logout", {});
};
