import FecthMyData from "@/components/fetchmydata";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const links = [
    {
      href: "/auth",
      label: "Sign In",
    },
    {
      href: "/products/create",
      label: "Create Product",
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
