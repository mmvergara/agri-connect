import FecthMyData from "@/components/fetchmydata";
import ProductCard from "@/components/product-card";
import { useAuth } from "@/context/AuthContext";
import { getProducts } from "@/services/ProductService";
import { ProductData } from "@/types/shared-types";
import Head from "next/head";
import Link from "next/link";
import { Button, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { AiOutlineShop, AiFillPlusSquare } from "react-icons/ai";
import { HiSearch } from "react-icons/hi";

export default function Home() {
  const [products, setProducts] = useState<ProductData[] | []>([]);
  const user = useAuth();
  const links = [
    {
      href: "/messages",
      label: "Messages",
    },
    {
      href: "/messages/list",
      label: "Messages List",
    },
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
    {
      href: "/discussion",
      label: "Discussion",
    },
    {
      href: "/discussion/create",
      label: "Create Discussion",
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
        <h2 className="mt-[5vh] font-poppins text-3xl font-bold">
          Feature Products
        </h2>
        <section className="mx-auto flex w-full max-w-[1700px] flex-wrap justify-center gap-8 p-4 ">
          {products.map((product) => {
            return (
              <ProductCard key={product.productID} ProductData={product} />
            );
          })}
          {products.map((product) => {
            return (
              <ProductCard key={product.productID} ProductData={product} />
            );
          })}
        </section>
        <Divider
          style={{
            borderBottomWidth: "4px",
            borderColor: "hsl(0, 0%, 90%)",
          }}
        />
        <section className="flex w-full max-w-[1680px] flex-wrap  items-center justify-start gap-2 px-4">
          <Link
            className="flex items-center justify-center gap-4 rounded-md bg-[#003d29] p-6 py-4 font-poppins text-lg font-semibold text-white opacity-90 hover:opacity-100"
            href="/product/search"
          >
            Search Products <HiSearch />
          </Link>{" "}
          <Link
            className="flex  items-center justify-center gap-4 rounded-md bg-[#003d29] p-6 py-4 font-poppins text-lg font-semibold text-white opacity-90 hover:opacity-100"
            href="/market?page=1"
          >
            Browse Market <AiOutlineShop />
          </Link>{" "}
          <Link
            className="flex  items-center justify-center gap-4 rounded-md bg-[#003d29] p-6 py-4 font-poppins text-lg font-semibold text-white opacity-90 hover:opacity-100"
            href="/product/create"
          >
            Create Product <AiFillPlusSquare />
          </Link>{" "}
        </section>
        <section className="mx-auto flex w-full max-w-[1700px] flex-wrap justify-start gap-8 p-4 ">
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
        <Link
          className="mb-8  rounded-md bg-[#003d29] p-6 py-4 font-poppins text-lg font-semibold text-white opacity-90 hover:opacity-100"
          href="/market?page=1"
        >
          See More Products
        </Link>{" "}
      </main>
    </>
  );
}
