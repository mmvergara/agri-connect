import { BASE_URL } from "@/config";
import axios, { AxiosError } from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

// Optional: Toast
const { toast } = createStandaloneToast();

// Initialize Types
type ApiRes<T> = {
  data: T | null;
  error: string | null;
};

type AxiosParsedResponse<T> =
  | { data: null; error: AxiosError<ApiRes<T>> }
  | {
      data: T;
      error: null;
    };

// Initialize Axios Instance
axios.defaults.withCredentials = true;
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle errors here
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
): Promise<AxiosParsedResponse<T>> => {
  const headers = isMultipart
    ? {
        "Content-Type": "multipart/form-data",
      }
    : {
        "Content-Type": "application/json",
      };
  try {
    const res = await AxiosInstance.post<ApiRes<T>>(url, data, { headers });
    return { data: res.data.data!, error: null };
  } catch (err) {
    const error = err as AxiosError<ApiRes<T>>;
    return { data: null, error: error };
  }
};

export const AxiosGet = async <T>(
  url: string
): Promise<AxiosParsedResponse<T>> => {
  try {
    const res = await AxiosInstance.get<ApiRes<T>>(url);
    return { data: res.data.data!, error: null };
  } catch (err) {
    const error = err as AxiosError<ApiRes<T>>;
    return { data: null, error: error };
  }
};
