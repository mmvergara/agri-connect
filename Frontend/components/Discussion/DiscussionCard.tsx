import { PostDataWithAuthor } from "@/types/shared-types";
import {
  ifMoreThanXCharactersAddThreeDots,
  timeFromNow,
} from "@/utils/helpers";
import { Icon } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
const DiscussionCard = (props: PostDataWithAuthor) => {
  const {
    postAuthor,
    postContent,
    postID,
    postDate,
    postTitle,
    postComments,
    postLikes,
  } = props;
  return (
    <Link
      href={`/discussion/${postID}`}
      className="flex w-full  max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 drop-shadow-md transition-all hover:drop-shadow-xl"
    >
      <Image
        src={
          postAuthor.avatarUrl ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        alt="Picture of the author"
        width={48}
        height={48}
        className="max-h-[48px] rounded-full"
      />
      <div>
        <p className="font-bold ">{postTitle}</p>
        <p className="text-gray-500">
          {postAuthor.username} - {timeFromNow(postDate)}
        </p>
        <p>{ifMoreThanXCharactersAddThreeDots(postContent, 100)}</p>
        <div className="mt-4 flex gap-4">
          <article className="flex items-center gap-2">
            <Icon as={FaRegComment} />
            {postComments.length}
          </article>{" "}
          <article className="flex items-center gap-2">
            <Icon as={FaRegHeart} />
            {postLikes.length}
          </article>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionCard;
