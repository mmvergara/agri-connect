import {
  Button,
  Center,
  Flex,
  Spacer,
  Icon,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import { FaBell } from "react-icons/fa";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const LazyLoadedMenuBar = dynamic(() => import("./MenuBar"), {
  ssr: false,
});

const Navbar = () => {
  const { user } = useAuth();
  return (
    <Flex as="header" boxShadow="lg" bg="green.900">
      <Flex className="h-[8vh]" width="100%" maxW="1200px" mx="auto" px="10px">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/agri-connect-logo.png"
            alt="agri-connect-logo"
            width={40}
            height={40}
          />
          <Heading
            as="h1"
            size="md"
            color="green.100"
            className="tracking-wider"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "normal",
            }}
          >
            AgriConnect {user?.username ? `| ${user.username}` : ""}
          </Heading>
        </Link>
        <Spacer />
        <Center>
          <Button
            color="green.100"
            bgColor="green.900"
            colorScheme="blackAlpha"
            p={1}
          >
            <Icon as={FaBell} />
          </Button>

          {user ? (
            <>
              {/* <Link href={`/u/${user?.username}`} className="pl-1 pr-4">
                <Avatar size="sm" src={user?.avatarUrl} />
              </Link> */}
              <LazyLoadedMenuBar />
            </>
          ) : (
            <Button
              as={Link}
              color="green.100"
              bgColor="green.800"
              colorScheme="whiteAlpha"
              style={{ fontWeight: 400 }}
              href="/auth"
            >
              Sign In
            </Button>
          )}
        </Center>
      </Flex>
    </Flex>
  );
};

export default Navbar;
