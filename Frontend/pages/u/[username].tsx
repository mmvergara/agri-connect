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
import { endorseUser, getUserProfileByUsername } from "@/services/UserService";
import { timeFromNow } from "@/utils/helpers";
import Image from "next/image";
import { getConversationByUserId } from "@/services/ConversationService";
import { useAuth } from "@/context/AuthContext";

const UserProfilePage = () => {
  const { query } = useRouter();
  const router = useRouter();
  const auth = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const username = query.username as string;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [endorsersCount, setEndorsersCount] = useState<number>(0);
  const [isEndorsed, setIsEndorsed] = useState<boolean>(false);
  const fetchUserProfile = async () => {
    if (!username) return;
    const { data, error } = await getUserProfileByUsername(username);
    if (error) {
      router.push("/");
      return;
    }
    setUserProfile(data);
    setEndorsersCount(data.ProductEndorsers.length);
    setIsEndorsed(
      data.ProductEndorsers.find(
        (endorser) => endorser.userID === auth.user?.id,
      )
        ? true
        : false,
    );
  };

  const handleMessageUser = async () => {
    if (!userProfile) return;
    const { data, error } = await getConversationByUserId({
      userID2: userProfile.userID,
    });
    if (error) return;
    if (data) {
      router.push(`/messages?id=${data?.conversation.conversationID}`);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [username]);
  if (!userProfile) <></>;

  const handleEndorseUser = async () => {
    const { data, error } = await endorseUser(userProfile?.userID!);
    if (error) return;
    console.log(data);
    if (data.isEndorsed) {
      setIsEndorsed(true);
      setEndorsersCount((prev) => prev + 1);
    } else {
      setIsEndorsed(false);
      setEndorsersCount((prev) => prev - 1);
    }
  };

  // Using userProfile?.createdAt get the time since the user joined

  const timeSinceJoinedString = timeFromNow(new Date(userProfile?.createdAt!));
  useEffect(() => {
    if (!auth.user) {
      router.push("/auth");
    }
  }, [auth.user]);

  return (
    <>
      <Head>
        <title>AgriConnect | {username} </title>
      </Head>
      <main>
        <section className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 bg-gray-700  bg-opacity-10 py-[5vh] shadow-xl">
          <Flex className="flex-col justify-center gap-y-4 rounded-lg border-[3px] border-gray-500 border-opacity-40 bg-gray-500 bg-opacity-10 p-8">
            <div className="flex items-center gap-2">
              <Avatar
                name="Dan Abrahmov"
                src={
                  userProfile?.avatarUrl ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
              />
              <div>
                <p className="flex items-center justify-center gap-2 text-lg font-semibold tracking-wide">
                  <span className="pb-1">{userProfile?.username}</span>
                  {userProfile?.verified && (
                    <MdVerified className="text-cyan-700" />
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-around gap-1  ">
              <Button
                color="white"
                bgColor="green.900"
                variant="solid"
                colorScheme="green"
                leftIcon={<EmailIcon />}
                onClick={handleMessageUser}
              >
                Message
              </Button>
              <Button
                colorScheme={isEndorsed ? "green" : "gray"}
                variant={isEndorsed ? "solid" : "outline"}
                className=" text-white"
                leftIcon={<StarIcon />}
                onClick={handleEndorseUser}
              >
                {isEndorsed ? "Endorsed" : "Endorse User"}
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
          <div className="flex flex-col gap-2 text-lg font-semibold text-black">
            <span className="flex items-center gap-2">
              <FiUserCheck /> Joined:<Text>{timeSinceJoinedString}</Text>
            </span>
            <span className="flex items-center gap-2">
              <AiOutlineShop /> Products:
              <Text>{userProfile?._count.products}</Text>
            </span>
            <span className="flex items-center gap-2">
              <StarIcon /> Endorsers:
              <Text>{endorsersCount}</Text>
            </span>
          </div>
        </section>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>QR Code: {username} </ModalHeader>
            <ModalBody className="flex items-center justify-center rounded-lg shadow-lg">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://agriconnect-ph.vercel.app/u/${username}`}
                alt="QR Code"
                width="200"
                height="200"
                className="rounded-md py-[100px]"
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        <section className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 bg-opacity-10  py-[10vh] pb-[20vh]">
          {userProfile?.products.length === 0 && (
            <p className="text-bold font-poppins text-3xl">
              This user has no products
            </p>
          )}
          {userProfile?.products.map((product) => (
            <ProductCard ProductData={product} key={product.productID} />
          ))}
        </section>
      </main>
    </>
  );
};

export default UserProfilePage;
