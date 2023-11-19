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

export const getRecentPosts = async (pageNumber: number) => {
  pageNumber -= 1;
  const take = 20;
  try {
    const posts = await db.posts.findMany({
      skip: pageNumber * take,
      take,
      orderBy: {
        postDate: "desc",
      },
      include: {
        postAuthor: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
        postComments: true,
        postLikes: true,
      },
    });

    console.log("==================================");
    console.log("getRecentPosts", posts);
    console.log("==================================");

    return posts;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const getPostWithCommentsandLikes = async (postID: string) => {
  try {
    const post = await db.posts.findUnique({
      where: {
        postID: postID,
      },
      include: {
        postAuthor: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
        postComments: {
          include: {
            commentAuthor: true,
          },
        },
        postLikes: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log("==================================");
    console.log("getPostWithCommentsandLikes", post);
    console.log("==================================");

    return post;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};
