import { PostDataWithAuthor } from "@/types/shared-types";
import { useEffect, useState } from "react";
import { useLoading } from "@/hooks/useLoadingHook";
import { useRouter } from "next/router";
import { getPosts } from "@/services/PostService";
import { HiSearch } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import DiscussionCard from "@/components/Discussion/DiscussionCard";
import Link from "next/link";
import Head from "next/head";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

const DiscussionPage = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  const { loadingSpinner, setIsLoading } = useLoading();
  const [posts, setPosts] = useState<PostDataWithAuthor[] | []>([]);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    if (page < 1) page = 1;
    const { data, error } = await getPosts(page);
    if (error) setPosts([]);
    else setPosts(data);
    setIsLoading(false);
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
    <>
      <Head>
        <title>AgriConnect - Discussion</title>
      </Head>
      <main className="flex flex-col items-center justify-center gap-4 py-4">
        <section className="flex flex-wrap gap-2">
          <Link
            className="flex items-center justify-center gap-4 rounded-md bg-[#003d29] p-6 py-4 font-poppins text-lg font-semibold text-white opacity-90 hover:opacity-100"
            href="/discussion/search"
          >
            Search Discussion <HiSearch />
          </Link>{" "}
          <Link
            className="flex items-center justify-center gap-4 rounded-md bg-[#003d29] p-6 py-4 font-poppins text-lg font-semibold text-white opacity-90 hover:opacity-100"
            href="/discussion/most-discussed"
          >
            Most Discussed <FaRegComment />
          </Link>
          <Link
            className="flex items-center justify-center gap-4 rounded-md bg-[#003d29] p-6 py-4 font-poppins text-lg font-semibold text-white opacity-90 hover:opacity-100"
            href="/discussion/most-liked"
          >
            Most Liked <FaRegHeart />
          </Link>
        </section>
        {loadingSpinner}
        {posts.map((post: PostDataWithAuthor) => {
          return <DiscussionCard key={post.postID} {...post} />;
        })}
        {posts.length === 0 && <p>No posts found</p>}
        <div className="mx-auto flex  items-center justify-start gap-4 py-6">
          <Button
            data-cy="prev-page-button"
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
            data-cy="next-page-button"
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
    </>
  );
};

export default DiscussionPage;
