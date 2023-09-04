import { AxiosError, AxiosResponse } from "axios";

export type ApiRes<T> = {
  data: T | null;
  error: string | null;
};

export type ApiErr = AxiosError<{ data: null; error: string }>;
