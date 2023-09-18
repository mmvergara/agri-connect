import FecthMyData from "@/components/fetchmydata";
import { useAuth } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useAuth();
  const links = [
    {
      href: "/auth",
      label: "Sign In",
    },
    {
      href: "/product/create",
      label: "Create Product",
    },
    {
      href: "/u/user2@gmail.com",
      label: "User 2 Profile",
    },
    {
      href: `/u/${user.user?.username}`,
      label: "My Profile",
    },
  ];
  return (
    <>
      <Head>
        <title>AgriConnect | Home</title>
      </Head>
      <main className="flex items-center gap-8 justify-center">
        {links.map((link) => (
          <Link href={link.href} className="bg-blue-500 p-2">
            {link.label}
          </Link>
        ))}
        <FecthMyData />
      </main>
    </>
  );
}
