import CreateComment from "@/components/Discussion/CreateComment";
import { useAuth } from "@/context/AuthContext";
import { getPost } from "@/services/PostService";
import { getProductById } from "@/services/ProductService";
import { PostDataWithAuthor } from "@/types/shared-types";
import {
  ifMoreThanXCharactersAddThreeDots,
  timeFromNow,
} from "@/utils/helpers";
import { Button, Divider, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { userAgent } from "next/server";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

const Discussion = () => {
  const auth = useAuth();

  const router = useRouter();

  const [comment, setComment] = useState<string>("");

  const { id } = router.query as { id: string };
  const [post, setPost] = useState<PostDataWithAuthor | null>(null);
  const fetchProduct = async (id: string) => {
    const { data, error } = await getPost(id);
    if (error) {
      return;
    }
    setPost(data);
  };
  useEffect(() => {
    if (!id) return;
    fetchProduct(id);
  }, [id]);

  if (!post) return <></>;
  console.log(post);

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
            <article className="flex items-center gap-2">
              <Icon as={FaRegHeart} />
              {post.postLikes.length}
            </article>
          </div>
        </div>
      </div>
      {auth.user && <CreateComment postID={post.postID} />}
      <Divider />
      <article className="flex items-center gap-2">
        <Icon as={FaRegComment} />
        {post.postComments.length} Comments
      </article>{" "}
      <Divider />
      <div className="flex w-full max-w-[900px] gap-4 rounded-md border-2 bg-gray-100 p-4  transition-all ">
        <div>
          <p className="text-gray-500">
            {post.postAuthor.username} - {timeFromNow(post.postDate)}
          </p>
          <p>{ifMoreThanXCharactersAddThreeDots(post.postContent, 100)}</p>
          <div className="mt-4 flex gap-4">
            <article className="flex items-center gap-2">
              <Icon as={FaRegHeart} />
              {post.postLikes.length}
            </article>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Discussion;
