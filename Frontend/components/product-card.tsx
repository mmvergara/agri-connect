import Image from "next/image";
import { Card, CardFooter, Text, Flex, Box } from "@chakra-ui/react";
import Link from "next/link";
import { ProductData } from "@/types/shared-types";

type props = {
  ProductData: ProductData;
};

const ProductCard = ({ ProductData }: props) => {
  return (
    <Link href={`/product/${ProductData.productID}`}>
      <Box
        maxW="xs"
        className="cursor-pointer bg-none shadow-green-100 transition duration-300 ease-in-out drop-shadow-md hover:drop-shadow-lg"
      >
        <Image
          objectFit="cover"
          src={ProductData.productImageUrl}
          alt="Chakra UI"
          width="300"
          height="220"
          className="max-h-[220px] max-w-[310px] overflow-hidden"
          style={{
            borderRadius: "7px 7px 0 0",
          }}
        />

        <Box
          className="bg-gray-50 p-4"
          style={{
            borderRadius: "0 0 7px 7px",
          }}
        >
          <Text className="font-poppins font-bold">
            {ProductData.productName}
          </Text>
          <Text className="font-arial text-gray-500">
            {ProductData.productDescription}
          </Text>
          <Text className="pt-4 font-arial font-semibold text-green-800">
            {ProductData.productPrice}$ per {ProductData.productPricePer}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
