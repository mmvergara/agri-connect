import { Router } from "express";
import { getAllPosts, postCreatePost } from "./posts-controller";

export default (router: Router) => {
  router.get("/posts/all", getAllPosts);
  router.post("/posts/create", postCreatePost);
};
