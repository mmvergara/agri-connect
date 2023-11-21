import { useLoading } from "@/hooks/useLoadingHook";
import { createComment } from "@/services/PostService";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

type CreateCommentProps = {
  postID: string;
};

const CreateComment = ({ postID }: CreateCommentProps) => {
  const [comment, setComment] = useState<string>("");
  const { isLoading,setIsLoading} = useLoading();
  const handleSubmitComment = async () => {
    setIsLoading(true);
    const { data, error } = await createComment({
      commentContent: comment,
      postID,
    }); 
    if(error) {
    } else {
      setComment("");
    }
  };
  return (
    <div className="flex w-full  max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 drop-shadow-md transition-all hover:drop-shadow-xl">
      <form className="w-full" onSubmit={handleSubmitComment}>
        <input
          type="text"
          className=" font-md w-full rounded-md bg-gray-100 p-4"
          placeholder="Comment something..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="mt-4" colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateComment;
