import Image from "next/image";
import { Card, CardFooter, Text, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const ProductCard = () => {
  const borderColor = useColorModeValue("#1c4532", "#c6f6d5");
  return (
    <div>
      <Card
        maxW="xs"
        style={{ borderRadius: "4px", padding: 4 }}
        className="shadow-green-100 hover:shadow-2xl transition duration-300 ease-in-out  cursor-pointer"
      >
        <Image
          objectFit="cover"
          src="https://source.unsplash.com/random/320x220/?nature,wallpaper"
          alt="Chakra UI"
          width="320"
          height="220"
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
          {/* Display Product name and price */}
          <Text fontSize="xl" fontWeight="semibold">
            Okra (Lady's Finger)
          </Text>
          <Flex
            justifyContent="space-between"
            className="pt-2 font-semibold"
            style={{ color: borderColor }}
          >
            <Text fontSize="md">Rs. 100$/kg</Text>
            <Text fontSize="md"></Text>
          </Flex>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
