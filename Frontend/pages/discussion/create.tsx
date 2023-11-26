import { useAuth } from "@/context/AuthContext";
import { createPost } from "@/services/PostService";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateDiscussion = () => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const auth = useAuth();
  const router = useRouter();

  const handleSubmitDiscussion = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const { data, error } = await createPost({ postTitle, postContent });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };

  useEffect(() => {
    if (!auth.user) {
      router.push("/auth");
    }
  }, [auth.user]);

  return (
    <>
      <Head>
        <title>AgriConnect - Create Discussion</title>
      </Head>
      <main className="mx-auto mt-[6vh] flex  w-full max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 pb-8 drop-shadow-md transition-all ">
        <Image
          src={
            auth.user?.avatarUrl ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt="Picture of the author"
          width={48}
          height={48}
          className="max-h-[48px] rounded-full"
        />
        <form className="w-full" onSubmit={handleSubmitDiscussion}>
          <p className="my-2 mb-4 text-lg font-semibold text-gray-500">
            Create New Discussion
          </p>
          <input
            type="text"
            className=" font-md mb-4 w-full rounded-md bg-gray-100 p-4"
            placeholder="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <textarea
            className=" font-md w-full rounded-md bg-gray-100 p-4"
            placeholder="Description"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          <Button className="mt-4" colorScheme="teal" type="submit">
            Create Discussion
          </Button>
        </form>
      </main>
    </>
  );
};

export default CreateDiscussion;
