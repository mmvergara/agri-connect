import { getPost } from "@/services/PostService";
import { getProductById } from "@/services/ProductService";
import { PostDataWithAuthor } from "@/types/shared-types";
import {
  ifMoreThanXCharactersAddThreeDots,
  timeFromNow,
} from "@/utils/helpers";
import { Icon } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

const Discussion = () => {
  const router = useRouter();

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
    <main className="flex">
      <article className="flex w-full  max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 drop-shadow-md transition-all hover:drop-shadow-xl">
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
          <p>{post.postContent}</p>
          <div className="mt-4 flex gap-4">
            <article className="flex items-center gap-2">
              <Icon as={FaRegComment} />
              {post.postComments.length}
            </article>{" "}
            <article className="flex items-center gap-2">
              <Icon as={FaRegHeart} />
              {post.postLikes.length}
            </article>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Discussion;
