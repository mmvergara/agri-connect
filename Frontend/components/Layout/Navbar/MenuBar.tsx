"use client";
import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { BsFillChatDotsFill } from "react-icons/bs";

const MenuBar = () => {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        icon={<BsFillChatDotsFill />}
        color="green.100"
        bgColor="green.900"
        colorScheme="blackAlpha"
        p={1}
      />
      <MenuList
        bg="green.900"
        color="white"
        className="rounded-sm transition-none p-0 gap-0"
      >
        <MenuItem className="p-0">
          <button className="py-3 hover:bg-green-950 grow min-h-[40px] flex items-center justify-center gap-2 font-semibold">
            <Icon as={BsFillChatDotsFill} />
            <span>Community Chat</span>
          </button>
        </MenuItem>
        <MenuItem className="p-0">
          <button className="py-3 hover:bg-green-950 grow min-h-[40px] flex items-center justify-center gap-2 font-semibold">
            Forum
          </button>
        </MenuItem>
        <MenuItem className="p-0">
          <button className="py-3 hover:bg-green-950 grow min-h-[40px]">
            Profile
          </button>
        </MenuItem>
        <MenuItem className="p-0">
          <button className="py-3 hover:bg-green-950 grow min-h-[40px]">
            Sign Out
          </button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuBar;
