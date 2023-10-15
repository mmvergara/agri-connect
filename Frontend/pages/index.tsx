import FecthMyData from "@/components/fetchmydata";
import ProductCard from "@/components/product-card";
import { useAuth } from "@/context/AuthContext";
import { getProducts } from "@/services/ProductService";
import { ProductData } from "@/types/shared-types";
import Head from "next/head";
import Link from "next/link";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const bgColor = useColorModeValue("hsl(0,0%,95%)", "#252b36");

  const [products, setProducts] = useState<ProductData[] | []>([]);
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

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await getProducts(1);
      if (error) return;
      setProducts(data);
    };
    fetch();
  }, []);
  return (
    <>
      <Head>
        <title>AgriConnect | Home</title>
      </Head>
      <main className="flex flex-col items-center justify-center gap-8">
        {links.map((link) => (
          <Link href={link.href} key={link.href} className="bg-blue-500 p-2">
            {link.label}
          </Link>
        ))}
        <section className="flex flex-wrap items-center justify-center gap-2">
          <Link
            className="p-6 text-lg font-semibold opacity-90 hover:opacity-100"
            style={{ backgroundColor: bgColor }}
            href="/product/search"
          >
            Search Products
          </Link>{" "}
          <Link
            className="p-6 text-lg font-semibold opacity-90 hover:opacity-100"
            style={{ backgroundColor: bgColor }}
            href="/market?page=1"
          >
            Market
          </Link>{" "}
          <Link
            className="p-6 text-lg font-semibold opacity-90 hover:opacity-100"
            style={{ backgroundColor: bgColor }}
            href="/product/create"
          >
            Create Product
          </Link>{" "}
        </section>
        <FecthMyData />
        <section
          className="mx-auto flex w-full max-w-[1400px] flex-wrap justify-center gap-4 p-4 "
          style={{
            backgroundColor: bgColor,
          }}
        >
          {products.map((product) => {
            return (
              <ProductCard key={product.productID} ProductData={product} />
            );
          })}
          {products.map((product) => {
            return (
              <ProductCard key={product.productID} ProductData={product} />
            );
          })}{" "}
          {products.map((product) => {
            return (
              <ProductCard key={product.productID} ProductData={product} />
            );
          })}
        </section>
        <Link href="/market?page=1">
          <Button
            color="white"
            bgColor="cyan.600"
            variant="solid"
            colorScheme="cyan"
            rounded={"sm"}
            my={8}
          >
            See More Products
          </Button>
        </Link>
      </main>
    </>
  );
}
