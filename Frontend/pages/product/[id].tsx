import { getProductById } from "@/services/ProductService";
import { ProductData } from "@/types/shared-types";
import { EmailIcon, StarIcon } from "@chakra-ui/icons";
import {
  Heading,
  Text,
  Container,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { IoQrCodeSharp } from "react-icons/io5";
import { timeFromNow } from "@/utils/helpers";

const ProductPreview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Container className="mx-auto flex max-w-[500px] flex-col items-start gap-4 ">
          <Image
            src={product.productImageUrl}
            alt="agri-connect-logo"
            width={320}
            height={220}
            className="mx-auto mt-8 border-spacing-8 rounded-md border-2 border-solid p-2"
          />
          <Text className="font-bold underline underline-offset-4">
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
            <IconButton
              onClick={onOpen}
              bgColor="white"
              color="black"
              aria-label="QR Code"
              icon={<IoQrCodeSharp />}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader>QR Code: {product.productName} </ModalHeader>
                <ModalBody className="flex items-center justify-center rounded-lg shadow-lg">
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://agriconnect-ph.vercel.app/product/${product.productID}`}
                    alt="QR Code"
                    width="200"
                    height="200"
                    className="rounded-md py-[100px]"
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </section>
          <span>Created: {timeFromNow(product.createdAt)}</span>
        </Container>
      </Container>
    </>
  );
};

export default ProductPreview;
