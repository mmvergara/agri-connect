import { BASE_URL } from "@/config";
import { ApiRes } from "@/types";
import axios from "axios";
axios.defaults.withCredentials = true;
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const AxiosPost = async <T>(url: string, data: any) =>
  AxiosInstance.post<ApiRes<T>>(url, data);

export const AxiosGet = async <T>(url: string) =>
  AxiosInstance.get<ApiRes<T>>(url);
