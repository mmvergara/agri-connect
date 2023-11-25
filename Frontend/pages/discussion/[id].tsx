import PostComment from "@/components/Discussion/Comment";
import CreateComment from "@/components/Discussion/CreateComment";
import { useAuth } from "@/context/AuthContext";
import {
  deleteComment,
  deletePost,
  getPost,
  likePost,
} from "@/services/PostService";
import type { PostCommentType, PostDataWithAuthor } from "@/types/shared-types";
import {
  ifMoreThanXCharactersAddThreeDots,
  timeFromNow,
} from "@/utils/helpers";
import { Button, Divider, Icon, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";

const Discussion = () => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query as { id: string };

  const [comments, setComments] = useState<PostCommentType[]>([]);
  const [post, setPost] = useState<PostDataWithAuthor | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number | null>();
  const fetchProduct = async (id: string) => {
    const { data, error } = await getPost(id);
    if (error) {
      return;
    }
    setPost(data);
    setComments(data.postComments);
    console.log(data.postLikes);
    setLiked(
      data.postLikes.find((like) => like.user.userID === auth.user?.id)
        ? true
        : false,
    );
    console.log(data.postLikes.length);
    setLikeCount(data.postLikes.length);
  };

  const handleLikePost = async () => {
    if (!auth.user) return;
    if (!post) return;
    const { data, error } = await likePost(post?.postID);
    if (error || !data) return;
    setLiked(data.isLiked || false);
    console.log(data.isLiked);
    if (data.isLiked) setLikeCount((prev) => prev! + 1);
    else setLikeCount((prev) => prev! - 1);
  };

  const handleAddComment = async (commentContent: PostCommentType) => {
    if (!auth.user) return;
    commentContent.commentAuthor = commentContent.commentAuthor || {
      userID: auth.user.id,
    };
    commentContent.postCommentsLikes = [];
    commentContent.commentAuthor.avatarUrl = auth.user?.avatarUrl;
    commentContent.commentAuthor.username = auth.user?.username;
    setComments((prev) => [commentContent, ...prev]);
  };

  const handleCommentDelete = async (commentID: string) => {
    const { data, error } = await deleteComment(commentID);
    if (error || !data) return;

    setComments((prev) =>
      prev.filter((comment) => comment.commentID !== commentID),
    );
    toast({
      title: "Comment Deleted.",
      isClosable: true,
      status: "success",
    });
  };

  const handleDeletePost = async () => {
    if (!post) return;
    const { error } = await deletePost(post?.postID);
    if (error) return;
    toast({
      title: "Post Deleted.",
      isClosable: true,
      status: "success",
    });
    router.push("/discussion");
  };
  useEffect(() => {
    if (!id) return;
    fetchProduct(id);
  }, [id]);

  if (!post) return <></>;

  return (
    <main className="mx-auto mt-[4vh] flex w-full max-w-[800px]  flex-col gap-4">
      <div className="flex w-full  max-w-[900px] gap-4 rounded-md bg-gray-200 p-4  drop-shadow-md transition-all hover:drop-shadow-xl">
        <Image
          src={
            post.postAuthor.avatarUrl ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt="Picture of the author"
          width={48}
          height={48}
          className="max-h-[48px] rounded-full"
        />

        <div>
          <p className="font-bold ">{post.postTitle}</p>
          <p className="text-gray-500">
            {post.postAuthor.username} - {timeFromNow(post.postDate)}
          </p>
          <p>{ifMoreThanXCharactersAddThreeDots(post.postContent, 100)}</p>
          <div className="mt-4 flex gap-4">
            <Button
              onClick={handleLikePost}
              className="flex items-center gap-2"
            >
              {liked ? (
                <Icon as={FaHeart} color="red" />
              ) : (
                <Icon as={FaRegHeart} />
              )}

              {likeCount}
            </Button>
          </div>
        </div>
        {post.postAuthor.userID === auth.user?.id && (
          <Icon
            onClick={handleDeletePost}
            as={RiDeleteBin6Line}
            className=" ml-auto inline-block cursor-pointer hover:text-red-500"
          />
        )}
      </div>
      {auth.user && (
        <CreateComment onAddComment={handleAddComment} postID={post.postID} />
      )}
      <Divider />
      <article className="flex items-center gap-2">
        <Icon as={FaRegComment} />
        {post.postComments.length} Comments
      </article>{" "}
      <Divider />
      {comments.map((comment) => {
        return (
          <PostComment
            onCommentDelete={handleCommentDelete}
            key={comment.commentID}
            commentData={comment}
          />
        );
      })}
    </main>
  );
};

export default Discussion;
