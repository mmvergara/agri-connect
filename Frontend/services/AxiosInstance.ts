import { BASE_URL } from "@/config";
import { ApiRes } from "@/types";
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosPost = async <T>(url: string, data: any) =>
  AxiosInstance.post<ApiRes<T>>(url, data);

export const AxiosGet = async <T>(url: string) => AxiosInstance.get<T>(url);
