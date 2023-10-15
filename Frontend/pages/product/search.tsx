import ProductCard from "@/components/product-card";
import { ProductData } from "@/types/shared-types";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { searchProducts } from "@/services/ProductService";

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
          className="mx-auto flex max-w-[500px] justify-center gap-4 py-6"
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
        <section className="mx-auto mt-4 flex w-full max-w-[1400px] flex-wrap justify-center gap-4 p-4 ">
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
