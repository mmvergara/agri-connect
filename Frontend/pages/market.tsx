import ProductCard from "@/components/product-card";
import { ProductData } from "@/types/shared-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useColorModeValue, Button } from "@chakra-ui/react";
import { getProducts } from "@/services/ProductService";

const Market = () => {
  const bgColor = useColorModeValue("hsl(0,0%,95%)", "#252b36");

  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [products, setProducts] = useState<ProductData[] | []>([]);

  const fetchProducts = async (page: number) => {
    if (page < 1) page = 1;
    const { data, error } = await getProducts(page);
    if (error) {
      setProducts([]);
      return;
    }
    setProducts(data);
  };

  const handleNextPage = () => router.push(`/market?page=${page + 1}`);
  const handlePrevPage = () => {
    if (page === 1) return;
    router.push(`/market?page=${page - 1}`);
  };

  useEffect(() => {
    if (page) {
      console.log(page);
      fetchProducts(page);
    }
  }, [page]);

  return (
    <>
      <Head>
        <title>AgriConnect | Market {page}</title>
      </Head>
      <main>
        <div className="flex justify-center gap-4 py-6">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1}
            color="white"
            bgColor="cyan.600"
            variant="solid"
            colorScheme="cyan"
            rounded={"sm"}
          >
            Prev
          </Button>
          <span className="text-2xl font-bold">{page}</span>
          <Button
            onClick={handleNextPage}
            color="white"
            bgColor="cyan.600"
            variant="solid"
            colorScheme="cyan"
            rounded={"sm"}
          >
            Next
          </Button>
        </div>
        <section
          className="mx-auto mt-4 flex w-full max-w-[1400px] flex-wrap justify-center gap-4 p-4 "
          style={{
            backgroundColor: bgColor,
          }}
        >
          {products.length === 0 ? (
            <span>No More Products</span>
          ) : (
            products.map((product) => {
              return (
                <ProductCard key={product.productID} ProductData={product} />
              );
            })
          )}
        </section>
      </main>
    </>
  );
};

export default Market;
