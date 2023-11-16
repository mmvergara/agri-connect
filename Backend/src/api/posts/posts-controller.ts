import { PostData } from "../../shared-types";
import { Req, Res } from "../../types/express-types";
import { createPost, fetchAllPosts } from "./posts-services";

export const getAllPosts = async (req: Req, res: Res) => {
  try {
    const posts = await fetchAllPosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const postCreatePost = async (req: Req, res: Res) => {
  try {
    const body = req.body as PostData;
    const newPost = createPost(body);
    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ error });
  }
};
