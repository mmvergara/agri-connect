import { getProductById } from "@/services/ProductService";
import { ProductData } from "@/types/shared-types";
import { EmailIcon, StarIcon } from "@chakra-ui/icons";
import {
  Heading,
  Text,
  Container,
  useColorModeValue,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdLibraryAdd } from "react-icons/md";

const ProductPreview = () => {
  const router = useRouter();
  const bgColor = useColorModeValue("white", "hsl(220,26%,18%)");

  const { id } = router.query as { id: string };
  const [product, setProduct] = useState<ProductData | null>(null);
  const fetchProduct = async (id: string) => {
    const { data, error } = await getProductById(id);
    if (error) {
      return;
    }
    console.log(data);
    setProduct(data);
  };
  useEffect(() => {
    if (!id) return;
    fetchProduct(id);
  }, [id]);

  if (!product) return <></>;

  return (
    <>
      <Head>
        <title>AgriConnect | {product.productName}</title>
      </Head>
      <Container
        bg={bgColor}
        minH="110vh"
        maxW="container.md"
        className="shadow-lg"
      >
        <Container className="flex flex-col items-start gap-4 max-w-[500px] mx-auto ">
          <Image
            src={product.productImageUrl}
            alt="agri-connect-logo"
            width={600}
            height={600}
            className="mx-auto mt-8 border-solid border-2 border-spacing-8 borde-[#1c4532] p-2 rounded-md"
          />
          <Text className="underline underline-offset-4 font-bold">
            ₱{product.productPrice + " per " + product.productPricePer}
          </Text>
          <Heading fontSize={24}>{product.productName}</Heading>
          <Text>{product.productDescription}</Text>

          <section className="flex w-full gap-2">
            <Button
              color="white"
              bgColor="cyan.600"
              variant="solid"
              colorScheme="cyan"
              className="w-full"
              leftIcon={<EmailIcon />}
            >
              Message Seller
            </Button>
            <Button
              color="white"
              bgColor="yellow.600"
              colorScheme="yellow"
              variant="solid"
              className="w-full"
              leftIcon={<StarIcon />}
            >
              Endorse Product
            </Button>
          </section>
        </Container>
      </Container>
    </>
  );
};

export default ProductPreview;
