import { AxiosGet, AxiosPost } from "./AxiosInstance";

const createPost = async (PostData: {
  postTitle: string;
  postContent: string;
}) => {
  return await AxiosPost<{ message: string }>("/posts/create", PostData);
};
