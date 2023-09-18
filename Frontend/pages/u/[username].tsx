import {
  Button,
  Flex,
  Avatar,
  Badge,
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
            <div className="flex gap-2">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <div>
                <p className="font-bold tracking-wide">Dan Abrahmove</p>
                <Badge variant="solid" colorScheme="cyan">
                  Verified
                </Badge>
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
            className="flex flex-col gap-2 font-bold text-lg"
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
      </main>
    </>
  );
};

export default UserProfilePage;
