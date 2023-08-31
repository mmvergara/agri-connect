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
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";

import ToggleColorMode from "./ToggleColorMode";
import Image from "next/image";
import Link from "next/link";

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
            <BellIcon />
          </Button>
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              color="green.100"
              bgColor="green.900"
              colorScheme="blackAlpha"
              p={1}
            />
            <MenuList
              bg="green.900"
              color="white"
              className="rounded-sm transition-none p-0"
            >
              <MenuItem className="p-1">
                <button className="hover:bg-green-950 grow min-h-[40px]">
                  <HamburgerIcon />
                  Community Chat
                </button>
              </MenuItem>{" "}
              <MenuItem className="p-1">
                <button className="hover:bg-green-950 grow min-h-[40px]">
                  Forum
                </button>
              </MenuItem>{" "}
              <MenuItem className="p-1">
                <button className="hover:bg-green-950 grow min-h-[40px]">
                  Profile
                </button>
              </MenuItem>{" "}
              <MenuItem className="p-1">
                <button className="hover:bg-green-950 grow min-h-[40px]">
                  Sign Out
                </button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Center>
        <Center></Center>
      </Flex>
    </Flex>
  );
};

export default Navbar;
