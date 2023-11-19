import { PostCreateField } from "../../shared-types";
import { Req, Res } from "../../types/express-types";
import {
  createPost,
  getPostWithCommentsandLikes,
  getRecentPosts,
} from "./posts-services";

export const postCreatePost = async (req: Req, res: Res) => {
  try {
    const body = req.body;

    const post: PostCreateField = {
      postAuthorID: req.session.user_id,
      postTitle: body.postTitle,
      postContent: body.postContent,
    };
    const newPost = await createPost(post);
    res.status(200).json({ data: newPost, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error });
  }
};

export const getAllPosts = async (req: Req, res: Res) => {
  try {
    const page = parseInt(req.params.page as string) || 0;
    const posts = await getRecentPosts(page);
    if (posts.length === 0) throw new Error("No posts found");
    return res.status(200).json({ data: posts, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const getPost = async (req: Req, res: Res) => {
  try {
    const postID = req.params.postid;
    const post = await getPostWithCommentsandLikes(postID);
    if (!post) throw new Error("No post found");
    return res.status(200).json({ data: post, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};
