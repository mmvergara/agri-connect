import {
  LoginFields,
  RegisterFields,
  UserData,
} from "@/types/shared-types/auth-types";
import { ApiErr } from "@/types";
import { AxiosPost } from "./AxiosInstance";

export const Login = async (userData: LoginFields) => {
  try {
    const res = await AxiosPost<UserData>("/auth/login", userData);
    return res.data;
  } catch (error) {
    const err = error as ApiErr;
    return {
      data: null,
      error: err.response?.data.error || "Something wen't wrong",
    };
  }
};

export const Register = async (userData: RegisterFields) => {
  try {
    await AxiosPost<UserData>("/auth/register", userData);
    return { data: null, error: null };
  } catch (error) {
    const err = error as ApiErr;
    return {
      data: null,
      error: err.response?.data.error || "Something wen't wrong",
    };
  }
};

export const Logout = async () => {
  try {
    await AxiosPost("/auth/logout", {});
  } catch (error) {
    const err = error as ApiErr;
    return {
      data: null,
      error: err.response?.data.error || "Something wen't wrong",
    };
  }
};
