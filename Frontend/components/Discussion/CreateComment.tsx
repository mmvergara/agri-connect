import { useLoading } from "@/hooks/useLoadingHook";
import { createComment } from "@/services/PostService";
import { PostCommentType } from "@/types/shared-types";

import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";

type CreateCommentProps = {
  postID: string;
  onAddComment: (data: PostCommentType) => void;
};

const CreateComment = ({ postID, onAddComment }: CreateCommentProps) => {
  const toast = useToast();
  const [comment, setComment] = useState<string>("");
  const { isLoading, setIsLoading } = useLoading();
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await createComment({
      commentContent: comment,
      postID,
    });
    if (error) {
    } else {
      console.log(data);
      setComment("");
      onAddComment(data);
      toast({
        title: "Comment Created.",
        isClosable: true,
        status: "success",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="flex w-full  max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 drop-shadow-md transition-all hover:drop-shadow-xl">
      <form className="w-full" onSubmit={handleSubmitComment}>
        <input
          data-cy="create-comment-input"
          disabled={isLoading}
          type="text"
          className=" font-md w-full rounded-md bg-gray-100 p-4"
          placeholder="Comment something..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          isLoading={isLoading}
          data-cy="create-comment-button"
          className="mt-4"
          colorScheme="teal"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateComment;
