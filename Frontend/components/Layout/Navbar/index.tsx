"use client";
import {
  Button,
  Center,
  Flex,
  Text,
  Spacer,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import ToggleColorMode from "./ToggleColorMode";
import Image from "next/image";
import Link from "next/link";
import MenuBar from "./MenuBar";

const Navbar = () => {
  return (
    <Flex as="header" boxShadow="lg" bg="green.900">
      <Flex minH={54} width="100%" maxW="1200px" mx="auto" px="10px">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/agri-connect-logo.png"
            alt="logo"
            width={40}
            height={40}
          />
          <Text as="b" color="green.100">
            AgriConnect
          </Text>
        </Link>
        <Spacer />
        <Center>
          <ToggleColorMode />
          <Button
            color="green.100"
            bgColor="green.900"
            colorScheme="blackAlpha"
            p={1}
          >
            s
          </Button>
          <MenuBar />
        </Center>
      </Flex>
    </Flex>
  );
};

export default Navbar;
