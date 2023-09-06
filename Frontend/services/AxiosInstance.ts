import { BASE_URL } from "@/config";
import { ApiRes } from "@/types";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";
axios.defaults.withCredentials = true;
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const { toast } = createStandaloneToast();

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    toast({
      title: error.response.data.error,
      status: "error",
      position: "top-right",
    });
    console.log(error);
    return Promise.reject(error);
  }
);

export const AxiosPost = async <T>(
  url: string,
  data: any,
  isMultipart: boolean = false
) => {
  const headers = isMultipart
    ? {
        "Content-Type": "multipart/form-data",
      }
    : {
        "Content-Type": "application/json",
      };
  return AxiosInstance.post<ApiRes<T>>(url, data, { headers });
};

export const AxiosGet = async <T>(url: string) =>
  AxiosInstance.get<ApiRes<T>>(url);
