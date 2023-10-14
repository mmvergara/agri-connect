import Image from "next/image";
import { Card, CardFooter, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useColorModeValue } from "@chakra-ui/react";
import { ProductData } from "@/types/shared-types";

type props = {
  ProductData: ProductData;
};

const ProductCard = ({ ProductData }: props) => {
  const borderColor = useColorModeValue("#1c4532", "#c6f6d5");
  return (
    <Link href={`/product/${ProductData.productID}`}>
      <Card
        maxW="xs"
        style={{ borderRadius: "1px", padding: 4 }}
        className="shadow-green-100 hover:shadow-2xl transition duration-300 ease-in-out  cursor-pointer"
      >
        <Image
          objectFit="cover"
          src={ProductData.productImageUrl}
          alt="Chakra UI"
          width="320"
          height="220"
          className="max-w-[310px] max-h-[220px] overflow-hidden"
        />

        <CardFooter
          justify="space-between"
          flexDir="column"
          flexWrap="wrap"
          padding="2"
          style={{
            borderBottom: `2px solid ${borderColor}`,
          }}
        >
          <Text fontSize="xl" fontWeight="semibold">
            {ProductData.productName}
          </Text>
          <Flex
            justifyContent="space-between"
            className="pt-2 font-semibold"
            style={{ color: borderColor }}
          >
            <Text fontSize="md">
              Rs. {ProductData.productPrice}$/{ProductData.productPricePer}
            </Text>
            <Text fontSize="md"></Text>
          </Flex>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
