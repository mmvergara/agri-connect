import Image from "next/image";

const CreateDiscussion = () => {
  return (
    <main className="mx-auto mt-[6vh] flex  w-full max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 drop-shadow-md transition-all hover:drop-shadow-xl">
      <Image
        src={
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        alt="Picture of the author"
        width={48}
        height={48}
        className="max-h-[48px] rounded-full"
      />
      <div className="w-full">
        <p className="text-gray-500">Create New Discussion</p>
        <input
          type="text"
          className=" w-full rounded-md bg-gray-100 p-4 font-md"
          placeholder="Discussion Title"
        />
   
        <div>
          <Image
            src="/assets/reply.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
          122
        </div>
      </div>
    </main>
  );
};

export default CreateDiscussion;
