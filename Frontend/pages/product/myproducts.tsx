import ProductRow from "@/components/product-row";
import { useAuth } from "@/context/AuthContext";
import { getProductByUserId } from "@/services/ProductService";
import { ProductData } from "@/types/shared-types";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyProducts = () => {
  const auth = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      if (!auth.user?.id) return;
      const { data, error } = await getProductByUserId(auth.user?.id);
      if (error) console.log(error);
      console.log(data);
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchMyProducts();
  }, [auth.user?.id]);

  const handleProductPriceUpdate = async (
    productID: string,
    newPrice: number,
  ) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.productID === productID) {
          return {
            ...product,
            productPrice: newPrice,
          };
        }
        return product;
      });
    });
  };

  const handleProductDelete = async (productID: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.productID !== productID);
    });
  };

  useEffect(() => {
    if (!auth.user) {
      router.push("/auth");
    }
  }, [auth.user]);

  return (
    <>
      <Head>
        <title>AgriConnect - My Products</title>
      </Head>
      <div className="mx-auto mt-[5vh] w-full max-w-[1000px]">
        <TableContainer className="rounded-md  bg-white">
          <Table variant="simple">
            {!loading && products.length === 0 && (
              <TableCaption>You have no products yet</TableCaption>
            )}
            <Thead>
              <Tr className="bg-[#1c4532] text-white">
                <Th style={{ color: "white" }}>Name</Th>
                <Th style={{ color: "white" }}>Price</Th>
                <Th style={{ color: "white" }}>Update Price</Th>
                <Th style={{ color: "white" }}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => {
                return (
                  <ProductRow
                    onProductDelete={handleProductDelete}
                    onProductPriceUpdate={handleProductPriceUpdate}
                    product={product}
                    key={product.productID}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MyProducts;
