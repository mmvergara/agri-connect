import { PostCommentType, PostDataWithAuthor } from "@/types/shared-types";
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

export const likePost = async (postID: string) => {
  return await AxiosPost<{ isLiked: boolean }>(`/posts/like`, { postID });
};

// Comments

export const deleteComment = async (commentID: string) => {
  return await AxiosPost<{ message: string }>(`/posts/comment/delete`, {
    commentID,
  });
};

export const createComment = async (commentData: {
  postID: string;
  commentContent: string;
}) => {
  return await AxiosPost<PostCommentType>("/posts/comment/create", commentData);
};

export const likeComment = async (commentID: string) => {
  return await AxiosPost<{ isLiked: boolean }>(`/posts/comment/like`, {
    commentID,
  });
};
