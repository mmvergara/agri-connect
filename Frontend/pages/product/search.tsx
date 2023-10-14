import ProductCard from "@/components/product-card";
import { ProductData } from "@/types/shared-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useColorModeValue, Button, Input } from "@chakra-ui/react";
import { getProducts, searchProducts } from "@/services/ProductService";

const SearchProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductData[] | []>([]);
  const [loading, setLoading] = useState(false);

  const [queried, setQueried] = useState(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    setQueried(true);
    console.log(searchQuery);
    const { data, error } = await searchProducts(searchQuery);
    if (error) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(false);
    setProducts(data);
  };

  return (
    <>
      <Head>
        <title>AgriConnect | Search Product</title>
      </Head>
      <main>
        <form
          className="flex justify-center gap-4 py-6 max-w-[500px] mx-auto"
          onSubmit={handleSearch}
        >
          <Input
            placeholder="Search Products"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            color="white"
            bgColor="cyan.600"
            variant="solid"
            colorScheme="cyan"
            rounded="sm"
          >
            Search
          </Button>
        </form>
        <section className="w-full max-w-[1400px] mx-auto mt-4 p-4 flex gap-4 justify-center flex-wrap ">
          {products.length === 0 && queried && !loading && (
            <span>No Products Found</span>
          )}
          {loading && <span>Loading...</span>}
          {!loading &&
            products.map((product) => (
              <ProductCard key={product.productID} ProductData={product} />
            ))}
        </section>
      </main>
    </>
  );
};

export default SearchProductPage;
