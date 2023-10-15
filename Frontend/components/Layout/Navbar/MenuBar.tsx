import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoChatbubblesSharp } from "react-icons/io5";
import { RiLogoutCircleRFill, RiSettingsFill } from "react-icons/ri";

import { AiFillShop } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
const MenuBar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const handleSignOut = () => {
    logout();
    router.push("/");
  };
  const MenuItems = [
    {
      name: "Marketplace",
      icon: <Icon as={AiFillShop} />,
      link: "/market",
    },
    {
      name: "Community Chat",
      icon: <Icon as={IoChatbubblesSharp} />,
      link: "/community-chat",
    },
    {
      name: "Settings",
      icon: <Icon as={RiSettingsFill} />,
      link: "/u/settings",
    },
  ];
  return (
    <Menu isLazy placement="bottom-end">
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
        className="rounded-sm transition-none p-0 gap-0 py-0 border-none"
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
        <MenuItem
          icon={<Icon as={RiLogoutCircleRFill} />}
          bg="green.900"
          className="hover:bg-green-950 grow min-h-[40px] flex items-center justify-center gap-2 font-semibold"
          onClick={handleSignOut}
        >
          <span>Sign Out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuBar;
