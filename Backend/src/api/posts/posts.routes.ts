import { Router } from "express";
import { getAllPosts, getPost, postCreatePost } from "./posts-controller";

export default (router: Router) => {
  router.post("/posts/create", postCreatePost);
  router.get("/posts/:postid", getPost);
  router.get("/posts/all/:page", getAllPosts);

  // router.post("/posts/comment/create", postCreatePost);
};
