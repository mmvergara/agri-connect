import { Button, Center, Flex, Text, Spacer, Icon } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const LazyLoadedToggleColorMode = dynamic(() => import("./ToggleColorMode"), {
  ssr: false,
});
const LazyLoadedMenuBar = dynamic(() => import("./MenuBar"), {
  ssr: false,
});

const Navbar = () => {
  return (
    <Flex as="header" boxShadow="lg" bg="green.900">
      <Flex minH={54} width="100%" maxW="1200px" mx="auto" px="10px">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/agri-connect-logo.png"
            alt="agri-connect-logo"
            width={40}
            height={40}
          />
          <Text as="b" color="green.100">
            AgriConnect
          </Text>
        </Link>
        <Spacer />
        <Center>
          <LazyLoadedToggleColorMode />
          <Button
            color="green.100"
            bgColor="green.900"
            colorScheme="blackAlpha"
            p={1}
          >
            <Icon as={FaBell} />
          </Button>
          <LazyLoadedMenuBar />
        </Center>
      </Flex>
    </Flex>
  );
};

export default Navbar;
