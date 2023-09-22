import {
  Button,
  Flex,
  Avatar,
  Badge,
  IconButton,
  Text,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoQrCodeSharp } from "react-icons/io5";
import { EmailIcon, StarIcon } from "@chakra-ui/icons";
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import ProductCard from "@/components/product-card";

const UserProfilePage = () => {
  const { query } = useRouter();
  const { colorMode } = useColorMode();
  const username = query.username as string;

  return (
    <>
      <Head>
        <title>{username} | AgriConnect</title>
      </Head>
      <main>
        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[5vh] text-white bg-opacity-10 bg-gray-400">
          <Flex
            boxShadow="2xl"
            bg="green.900"
            className="justify-center p-8 rounded-lg border-[1px] border-[#c6f6d5] flex-col gap-y-4"
          >
            <div className="flex gap-2 items-center">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <div>
                <p className="font-semibold tracking-wide flex gap-2 justify-center items-center text-lg">
                  <span className="pb-1">dan abramov</span>
                  <MdVerified className="text-cyan-300" />
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center gap-1 flex-wrap">
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
              <FiUserCheck /> Joined:<Text>2 months ago</Text>
            </span>
            <span className="flex gap-2 items-center">
              <AiOutlineShop /> Products:<Text>2</Text>
            </span>
            <span className="flex gap-2 items-center">
              <StarIcon /> Endorsers:<Text>5</Text>
            </span>
          </div>
        </section>
        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[5vh] bg-opacity-10 bg-gray-300">
          <p className="max-w-[1200px] px-16 font-semibold ">
            <span className="text-lg">Desription</span> <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur,
            ipsum nobis! Magnam fugit veniam rem, cum eum corrupti qui adipisci
            eligendi tempore quaerat perferendis ea sunt debitis excepturi
            doloremque soluta? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Aspernatur facilis nisi atque harum. Animi,
            corporis iusto. Culpa assumenda velit eveniet illo saepe quisquam
            quae laboriosam vitae, temporibus earum facere recusandae!
          </p>
        </section>
        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[5vh] bg-opacity-10">
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
