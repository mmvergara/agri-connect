import DiscussionCard from "@/components/Discussion/DiscussionCard";
import { getPosts } from "@/services/PostService";
import { PostData, PostDataWithAuthor } from "@/types/shared-types";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DiscussionPage = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [posts, setPosts] = useState<PostDataWithAuthor[] | []>([]);

  const fetchProducts = async (page: number) => {
    if (page < 1) page = 1;
    const { data, error } = await getPosts(page);
    if (error) {
      setPosts([]);
      return;
    }
    setPosts(data);
  };

  const handleNextPage = () => router.push(`/discussion?page=${page + 1}`);
  const handlePrevPage = () => {
    if (page === 1) return;
    router.push(`/discussion?page=${page - 1}`);
  };

  useEffect(() => {
    if (page) {
      fetchProducts(page);
    }
  }, [page]);
  console.log(posts);
  return (
    <main className="flex flex-col items-center justify-center gap-4 py-4">
      {posts.map((post: PostDataWithAuthor) => {
        return <DiscussionCard key={post.postID} {...post} />;
      })}
      {posts.length === 0 && <p>No posts found</p>}
      <div className="mx-auto flex  items-center justify-start gap-4 py-6">
        <Button
          onClick={handlePrevPage}
          disabled={page === 1}
          color="white"
          bgColor="green.900"
          variant="solid"
          colorScheme="green"
          rounded={"sm"}
        >
          Prev
        </Button>
        <span className="font-poppins text-3xl font-bold"> {page}</span>
        <Button
          onClick={handleNextPage}
          color="white"
          bgColor="green.900"
          variant="solid"
          colorScheme="green"
          rounded={"sm"}
        >
          Next
        </Button>
      </div>
    </main>
  );
};

export default DiscussionPage;
