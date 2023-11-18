import { useAuth } from "@/context/AuthContext";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const CreateDiscussion = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmitDiscussion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, description)
  }

  const user = useAuth();
  return (
    <main className="mx-auto mt-[6vh] flex  w-full max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 pb-8 drop-shadow-md transition-all hover:drop-shadow-xl">
      <Image
        src={
          user.user?.avatarUrl ||
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
        />
        <textarea
          className=" font-md w-full rounded-md bg-gray-100 p-4"
          placeholder="Description"
        />

        <Button className="mt-4" colorScheme="teal">
          Create Discussion
        </Button>
      </form>
    </main>
  );
};

export default CreateDiscussion;
