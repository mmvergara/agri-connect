import {
  Button,
  Flex,
  Avatar,
  IconButton,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
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
import { timeFromNow } from "@/utils/helpers";
import Image from "next/image";

const UserProfilePage = () => {
  const { query } = useRouter();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
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

  console.log(userProfile);
  useEffect(() => {
    fetchUserProfile();
  }, [username]);
  if (!userProfile) <></>;

  // Using userProfile?.createdAt get the time since the user joined

  const timeSinceJoinedString = timeFromNow(new Date(userProfile?.createdAt!));

  return (
    <>
      <Head>
        <title>{username} | AgriConnect</title>
      </Head>
      <main>
        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[5vh]  bg-opacity-10 bg-gray-700 shadow-xl">
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
                onClick={onOpen}
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
              <FiUserCheck /> Joined:<Text>{timeSinceJoinedString}</Text>
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>QR Code: {username} </ModalHeader>
            <ModalBody className="flex justify-center items-center rounded-lg shadow-lg">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://agriconnect-ph.vercel.app/u/${username}`}
                alt="QR Code"
                width="200"
                height="200"
                className="py-[100px] rounded-md"
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        <section className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 py-[10vh] pb-[20vh]  bg-gray-800 bg-opacity-10">
          {userProfile?.products.map((product) => (
            <ProductCard ProductData={product} key={product.productID} />
          ))}
        </section>
      </main>
    </>
  );
};

export default UserProfilePage;
