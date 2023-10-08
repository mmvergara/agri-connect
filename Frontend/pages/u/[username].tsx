import {
  Button,
  Flex,
  Avatar,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoQrCodeSharp } from "react-icons/io5";
import { EmailIcon, StarIcon } from "@chakra-ui/icons";
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import ProductCard from "@/components/product-card";
import { UserProfile } from "@/types/shared-types";
import { useEffect, useState } from "react";
import { getUserProfileByUsername } from "@/services/UserService";

const UserProfilePage = () => {
  const { query } = useRouter();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const username = query.username as string;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const fetchUserProfile = async () => {
    if (!username) return;
    const { data, error } = await getUserProfileByUsername(username);
    if (error) {
      router.push("/");
      return;
    }
    setUserProfile(data);
  };
  useEffect(() => {
    fetchUserProfile();
  }, [username]);
  if (!userProfile) <></>;

  // Using userProfile?.createdAt get the time since the user joined

  const timeSinceJoined = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  const timeSinceJoinedString = timeSinceJoined(
    new Date(userProfile?.createdAt!)
  );

  return (
    <>
      <Head>
        <title>{username} | AgriConnect</title>
      </Head>
      <main>
        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[5vh]  bg-opacity-10 bg-gray-700">
          <Flex className="justify-center p-8 rounded-lg border-[3px] border-gray-500 bg-gray-500 bg-opacity-10 border-opacity-40 flex-col gap-y-4">
            <div className="flex gap-2 items-center">
              <Avatar
                name="Dan Abrahmov"
                src={
                  userProfile?.avatarUrl ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
              />
              <div>
                <p className="font-semibold tracking-wide flex gap-2 justify-center items-center text-lg">
                  <span className="pb-1">{userProfile?.username}</span>
                  {userProfile?.verified && (
                    <MdVerified className="text-cyan-700" />
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center gap-1 flex-wrap  ">
              <Button
                color="white"
                bgColor="yellow.600"
                colorScheme="yellow"
                variant="solid"
                leftIcon={<StarIcon />}
              >
                Endorse
              </Button>
              <Button
                color="white"
                bgColor="cyan.600"
                variant="solid"
                colorScheme="cyan"
                leftIcon={<EmailIcon />}
              >
                Message
              </Button>
              <IconButton
                bgColor="white"
                color="black"
                aria-label="QR Code"
                icon={<IoQrCodeSharp />}
              />
            </div>
          </Flex>
          <div
            className="flex flex-col gap-2 font-semibold text-lg"
            style={{
              color: colorMode === "dark" ? "white" : "black",
            }}
          >
            <span className="flex gap-2 items-center">
              <FiUserCheck /> Joined:<Text>{timeSinceJoinedString} ago</Text>
            </span>
            <span className="flex gap-2 items-center">
              <AiOutlineShop /> Products:
              <Text>{userProfile?._count.products}</Text>
            </span>
            <span className="flex gap-2 items-center">
              <StarIcon /> Endorsers:
              <Text>{userProfile?._count.ProductEndorsers}</Text>
            </span>
          </div>
        </section>
        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[5vh] bg-opacity-10 bg-gray-300">
          <p className="max-w-[1200px] px-16 font-semibold ">
            <span className="text-lg">Description</span> <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur,
            ipsum nobis! Magnam fugit veniam rem, cum eum corrupti qui adipisci
            eligendi tempore quaerat perferendis ea sunt debitis excepturi
            doloremque soluta? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Aspernatur facilis nisi atque harum. Animi,
            corporis iusto. Culpa assumenda velit eveniet illo saepe quisquam
            quae laboriosam vitae, temporibus earum facere recusandae!
          </p>
        </section>
        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[5vh]  bg-gray-700 bg-opacity-10">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </section>
      </main>
    </>
  );
};

export default UserProfilePage;
