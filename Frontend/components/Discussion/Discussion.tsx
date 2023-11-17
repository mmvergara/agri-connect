import Image from "next/image";
import Link from "next/link";

const Discussion = () => {
  return (
    <section className="flex w-full  max-w-[900px] gap-4 rounded-md bg-gray-200 p-4 drop-shadow-md">
      <Image
        src={
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        alt="Picture of the author"
        width={48}
        height={48}
        className="max-h-[48px] rounded-full"
      />
      <div>
        <p className="font-bold ">Threads title</p>
        <p className="text-gray-500">Threads Author - a day ago</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
          atque deserunt iusto ad aut nobis, nostrum quibusdam quo, ducimus
          incidunt nemo perspiciatis eligendi dignissimos rerum id consequuntur
          earum explicabo cupiditate!
        </p>
        <div>
          <Link href={`/thread/${22}`}>
            <Image
              src="/assets/reply.svg"
              alt="heart"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
          </Link>
          122
        </div>
      </div>
    </section>
  );
};

export default Discussion;
