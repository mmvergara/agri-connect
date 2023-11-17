import DeleteThread from "@/components/Discussion/DeleteThread";
import Image from "next/image";
import Link from "next/link";

const Discussion = () => {
  return <main className="flex">
    <Image
      src={"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
      alt="Picture of the author"
      width={48}
      height={48}
      className="rounded-full"
    />
  </main>;
};

export default Discussion;
