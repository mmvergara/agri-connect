import { FaRegHeart } from "react-icons/fa";
import { Button, Icon } from "@chakra-ui/react";
import { timeFromNow } from "@/utils/helpers";
import { PostCommentType } from "@/types/shared-types";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { likeComment } from "@/services/PostService";
import { FaHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
type PostCommentProps = {
  commentData: PostCommentType;
  onCommentDelete: (commentID: string) => void;
};
const PostComment = ({ commentData, onCommentDelete }: PostCommentProps) => {
  const {
    commentAuthor,
    commentDate,
    commentContent,
    postCommentsLikes,
    commentID,
  } = commentData;

  const user = useAuth();
  const [likeCount, setLikeCount] = useState<number>(postCommentsLikes.length);
  const [liked, setLiked] = useState<boolean>(
    postCommentsLikes.find((like) => like.userID === user.user?.id)
      ? true
      : false,
  );

  const handleLikeComment = async () => {
    const { data, error } = await likeComment(commentID);
    if (error || !data) return;
    setLiked(data.isLiked || false);
    if (data.isLiked) setLikeCount((prev) => prev + 1);
    else setLikeCount((prev) => prev - 1);
  };

  return (
    <div className="flex w-full max-w-[900px] gap-4 rounded-md border-2 bg-gray-100 p-4  transition-all ">
      <div className="w-full ">
        <div className="flex items-center justify-between text-gray-500">
          <span>
            {commentAuthor.username} - {timeFromNow(new Date(commentDate))}{" "}
          </span>
          {commentAuthor.userID === user.user?.id && (
            <Icon
              onClick={() => onCommentDelete(commentID)}
              as={RiDeleteBin6Line}
              className=" inline-block cursor-pointer hover:text-red-500"
            />
          )}
        </div>
        <p>{commentContent}</p>
        <div className="mt-4 flex gap-4">
          <Button
            onClick={handleLikeComment}
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
    </div>
  );
};

export default PostComment;
