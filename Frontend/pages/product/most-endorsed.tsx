import ProductCard from "@/components/product-card";
import { ProductData } from "@/types/shared-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useColorModeValue, Button } from "@chakra-ui/react";
import { getMostEndorsedProducts } from "@/services/ProductService";

const MostEndorsedProduct = () => {
  const bgColor = "hsl(0,0%,95%)";

  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [products, setProducts] = useState<ProductData[] | []>([]);

  const fetchProducts = async (page: number) => {
    if (page < 1) page = 1;
    const { data, error } = await getMostEndorsedProducts(page);
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
    } else {
      console.log("page not found");
      router.push("/market?page=1");
    }
  }, [page]);

  return (
    <>
      <Head>
        <title>AgriConnect | Most Endorsed {page}</title>
      </Head>
      <main>
        <div className="mx-auto flex w-full max-w-[1370px] items-center justify-start gap-4 py-6">
          <span className="font-poppins text-3xl font-bold">Page: {page}</span>
          <Button
            data-cy="prev-page-button"
            onClick={handlePrevPage}
            disabled={page === 1}
            color="white"
            bgColor="green.900"
            variant="solid"
            colorScheme="green"
            rounded={"sm"}
          >
            Prev
          </Button>
          <Button
            data-cy="next-page-button"
            onClick={handleNextPage}
            color="white"
            bgColor="green.900"
            variant="solid"
            colorScheme="green"
            rounded={"sm"}
          >
            Next
          </Button>
        </div>
        <section
          className="mx-auto mt-4 flex w-full max-w-[1400px] flex-wrap justify-start gap-4 p-4 "
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

export default MostEndorsedProduct;
