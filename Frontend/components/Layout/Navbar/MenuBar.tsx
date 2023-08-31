import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoChatbubblesSharp } from "react-icons/io5";
import { RiLogoutCircleRFill } from "react-icons/ri";
const MenuBar = () => {
  const MenuItems = [
    {
      name: "Community Chat",
      icon: <Icon as={IoChatbubblesSharp} />,
      link: "/community-chat",
    },
    {
      name: "Sign Out",
      icon: <Icon as={RiLogoutCircleRFill} />,
      link: "/auth/sign-in",
    },
  ];
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<Icon as={GiHamburgerMenu} />}
        color="green.100"
        bgColor="green.900"
        colorScheme="blackAlpha"
        p={1}
      />
      <MenuList
        bg="green.900"
        color="white"
        className="rounded-sm transition-none p-0 gap-0 py-0"
        style={{ padding: 1 }}
      >
        {MenuItems.map(({ icon, link, name }) => (
          <MenuItem
            as={Link}
            key={name}
            icon={icon}
            bg="green.900"
            className="hover:bg-green-950 grow min-h-[40px] flex items-center justify-center gap-2 font-semibold"
            href={link}
          >
            <span>{name}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuBar;
