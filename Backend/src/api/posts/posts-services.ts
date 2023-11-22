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
            postCommentsLikes: true,
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

export const addComment = async (
  postID: string,
  comment: string,
  userID: string
) => {
  try {
    const newComment = await db.postComments.create({
      data: {
        commentContent: comment,
        commentAuthorID: userID,
        postID: postID,
      },
    });

    console.log("==================================");
    console.log("addComment", newComment);
    console.log("==================================");

    return newComment;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding comment");
  }
};

export const deleteComment = async (commentID: string) => {
  try {
    const comment = await db.postComments.delete({
      where: {
        commentID: commentID,
      },
    });

    console.log("==================================");
    console.log("deleteComment", comment);
    console.log("==================================");

    return comment;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting comment");
  }
};

export const likeExists = async (commentID: string, userID: string) => {
  try {
    const comment = await db.postCommentsLikes.findFirst({
      where: {
        id: commentID,
        AND: {
          userID: userID,
        },
      },
    });

    console.log("==================================");
    console.log("likeExists", comment);
    console.log("==================================");

    return comment;
  } catch (error) {
    console.log(error);
    throw new Error("Error checking if like exists");
  }
};

export const unlikeComment = async (commentID: string, userID: string) => {
  try {
    const comment = await db.postCommentsLikes.delete({
      where: {
        id: commentID,
        AND: {
          userID: userID,
        },
      },
    });

    console.log("==================================");
    console.log("unlikeComment", comment);
    console.log("==================================");

    return comment;
  } catch (error) {
    console.log(error);
    throw new Error("Error unliking comment");
  }
};

export const likeComment = async (
  commentID: string,
  userID: string
): Promise<{ isLiked: boolean }> => {
  try {
    // Check first if like exists then delete it, else create it

    const comment = await db.postCommentsLikes.findFirst({
      where: {
        AND: [{ commentID }, { userID }],
      },
    });

    if (comment) {
      await db.postCommentsLikes.delete({
        where: {
          id: comment.id,
        },
      });
      return { isLiked: false };
    } else {
      await db.postCommentsLikes.create({
        data: {
          commentID: commentID,
          userID: userID,
        },
      });
      return { isLiked: true };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error liking comment");
  }
};

// same as above but for posts

export const likePost = async (postID: string, userID: string) => {
  try {
    // Check first if like exists then delete it, else create it

    const post = await db.postLikes.findFirst({
      where: {
        AND: [{ postID }, { userID }],
      },
    });

    if (post) {
      await db.postLikes.delete({
        where: {
          id: post.id,
        },
      });
      return { isLiked: false };
    } else {
      await db.postLikes.create({
        data: {
          postID: postID,
          userID: userID,
        },
      });
      return { isLiked: true };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error liking post");
  }
};
