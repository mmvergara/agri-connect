import { PostDataWithAuthor } from "@/types/shared-types";
import { AxiosGet, AxiosPost } from "./AxiosInstance";

export const getPosts = async (pageNumber: number) => {
  return await AxiosGet<PostDataWithAuthor[]>(`/posts/all/${pageNumber}`);
};

export const createPost = async (PostData: {
  postTitle: string;
  postContent: string;
}) => {
  return await AxiosPost<{ message: string }>("/posts/create", PostData);
};

export const getPost = async (postID: string) => {
  return await AxiosGet<PostDataWithAuthor>(`/posts/${postID}`);
};

export const createComment = async (commentData: {
  postID: string;
  commentContent: string;
}) => {
  return await AxiosPost<{ message: string }>(
    "/posts/comment/create",
    commentData,
  );
};

