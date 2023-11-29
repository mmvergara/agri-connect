import ProductCard from "@/components/product-card";
import { PostDataWithAuthor, ProductData } from "@/types/shared-types";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button, Input, Divider } from "@chakra-ui/react";
import { searchProducts } from "@/services/ProductService";
import { HiSearch } from "react-icons/hi";
import DiscussionCard from "@/components/Discussion/DiscussionCard";
import { searchPosts } from "@/services/PostService";

const SearchDiscussionpage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<PostDataWithAuthor[] | []>([]);

  const [loading, setLoading] = useState(false);

  const [queried, setQueried] = useState(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    setQueried(true);
    console.log(searchQuery);
    const { data, error } = await searchPosts(searchQuery);
    if (error) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(false);
    setPosts(data);
  };

  return (
    <>
      <Head>
        <title>AgriConnect | Search Discussion</title>
      </Head>
      <main>
        <form
          className="mx-auto flex max-w-[500px] justify-center gap-4 py-6"
          onSubmit={handleSearch}
        >
          <Input
            data-cy="search-query-input"
            placeholder="Search Discussion by Title"
            value={searchQuery}
            borderColor={"gray.400"}
            rounded="full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            data-cy="submit-search-button"
            type="submit"
            color="white"
            bgColor="green.900"
            variant="solid"
            colorScheme="green"
            rounded="full"
            className="flex items-center justify-center gap-4"
            px={8}
          >
            Search{" "}
            <span>
              <HiSearch />
            </span>
          </Button>
        </form>
        <Divider
          style={{
            borderBottomWidth: "4px",
            borderColor: "hsl(0, 0%, 87%)",
          }}
        />
        <section className="mx-auto mt-4 flex w-full max-w-[1400px] flex-wrap justify-center gap-4 p-4 ">
          {posts.length === 0 && queried && !loading && (
            <span>No Posts Found</span>
          )}
          {loading && <span>Loading...</span>}
          {posts.map((post: PostDataWithAuthor) => {
            return <DiscussionCard key={post.postID} {...post} />;
          })}
        </section>
      </main>
    </>
  );
};

export default SearchDiscussionpage;
