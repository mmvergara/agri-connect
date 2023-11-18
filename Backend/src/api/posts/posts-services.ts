import { db } from "../../lib/db";
import { PostCreateField, PostData } from "../../shared-types";

export const fetchAllPosts = async () => {
  try {
    const posts = await db.posts.findMany({
      include: {
        postAuthor: true,
      },
    });
    console.log("==================================");
    console.log("fetchAllPosts", posts);
    console.log("==================================");

    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting all posts");
  }
};

export const createPost = async (post: PostCreateField) => {
  try {
    const newPost = await db.posts.create({
      data: {
        ...post,
      },
    });
    console.log("==================================");
    console.log("createPosts", newPost);
    console.log("==================================");

    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating post");
  }
};
