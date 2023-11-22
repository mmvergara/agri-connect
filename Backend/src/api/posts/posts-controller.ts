import { PostCreateField } from "../../shared-types";
import { Req, Res } from "../../types/express-types";
import {
  addComment,
  createPost,
  getPostWithCommentsandLikes,
  getRecentPosts,
  likeComment,
  deleteComment,
  likeExists,
  unlikeComment,
  likePost,
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
    res.status(201).json({ data: newPost, error: null });
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

export const postLikePost = async (req: Req, res: Res) => {
  try {
    const { postID } = req.body;
    const userID = req.session.user_id;
    const data = await likePost(postID, userID);
    res.status(201).json({ data, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};

// Comments
export const postCreateComment = async (req: Req, res: Res) => {
  try {
    const { postID, commentContent } = req.body;
    const data = await addComment(postID, commentContent, req.session.user_id);
    res.status(201).json({ data: data, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const postLikeComment = async (req: Req, res: Res) => {
  try {
    const { commentID } = req.body;
    const userID = req.session.user_id;
    const data = await likeComment(commentID, userID);
    res.status(201).json({ data, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const postDeleteComment = async (req: Req, res: Res) => {
  try {
    const { commentID } = req.body;
    console.log(req.body);
    const data = await deleteComment(commentID);
    res.status(201).json({ data: data, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};
