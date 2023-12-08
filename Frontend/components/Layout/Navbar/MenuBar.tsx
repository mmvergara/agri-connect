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
import { CgProfile } from "react-icons/cg";
import { AiFillShop } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
const MenuBar = () => {
  const { logout, user } = useAuth();
  const router = useRouter();
  const handleSignOut = () => {
    logout();
    router.push("/");
  };
  const MenuItems = [
    {
      name: "My Profile",
      icon: <Icon as={CgProfile} />,
      link: `/u/${user?.username}`,
    },
    {
      name: "My Products",
      icon: <Icon as={AiFillShop} />,
      link: "/product/myproducts",
    },
    {
      name: "Community Chat",
      icon: <Icon as={IoChatbubblesSharp} />,
      link: "/messages/community",
    },
    {
      name: "Marketplace",
      icon: <Icon as={AiFillShop} />,
      link: "/market",
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
        data-cy="menu-bar-button"
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
        className="gap-0 rounded-sm border-none p-0 py-0 transition-none"
        style={{ padding: 1 }}
      >
        {MenuItems.map(({ icon, link, name }) => (
          <MenuItem
            data-cy={`${name}-button`}
            as={Link}
            key={name}
            icon={icon}
            bg="green.900"
            className="flex min-h-[40px] grow items-center justify-center gap-2 font-semibold hover:bg-green-950"
            href={link}
          >
            <span>{name}</span>
          </MenuItem>
        ))}
        <MenuItem
          data-cy="sign-out-button"
          icon={<Icon as={RiLogoutCircleRFill} />}
          bg="green.900"
          className="flex min-h-[40px] grow items-center justify-center gap-2 font-semibold hover:bg-green-950"
          onClick={handleSignOut}
        >
          <span>Sign Out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuBar;
