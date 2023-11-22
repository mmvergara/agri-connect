import { Router } from "express";
import {
  getAllPosts,
  getPost,
  postCreateComment,
  postCreatePost,
  postDeleteComment,
  postLikeComment,
  postLikePost,
} from "./posts-controller";
import { isAuth } from "../../middleware/isAuth";

export default (router: Router) => {
  router.get("/posts/:postid", getPost);
  router.get("/posts/all/:page", getAllPosts);
  router.post("/posts/create", isAuth, postCreatePost);
  router.post("/posts/like", isAuth, postLikePost);

  router.post("/posts/comment/create", isAuth, postCreateComment);
  router.post("/posts/comment/like", isAuth, postLikeComment);
  router.post("/posts/comment/delete", isAuth, postDeleteComment);
  // router.post("/posts/comment/create", postCreatePost);
};
