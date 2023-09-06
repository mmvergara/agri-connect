import { createProduct } from "@/services/ProductService";
import {
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Container,
  Divider,
  Button,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef, FormEvent } from "react";
import { FaImage } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";

const CreateProduct = () => {
  const bgColor = useColorModeValue("white", "hsl(220,26%,18%)");
  const { colorMode } = useColorMode();
  const [inputs, setInputs] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productPricePer: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) return console.log("No image");
    const formData = new FormData();
    formData.append("productName", inputs.productName);
    formData.append("productDescription", inputs.productDescription);
    formData.append("productPrice", inputs.productPrice);
    formData.append("productPricePer", inputs.productPricePer);
    formData.append("productImage", image);
    const { data, error } = await createProduct(formData);
    if (error) return console.log(error);
    console.log(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const imageInputRef = useRef<HTMLInputElement | null>(null!);
  const handleImageUploadClick = () => imageInputRef.current?.click();
  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return console.log("No files");
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  return (
    <>
      <Head>
        <title>AgriConnect | Create Product</title>
      </Head>
      <Container
        bg={bgColor}
        minH="110vh"
        maxW="container.md"
        className="shadow-lg"
      >
        <FormControl
          isRequired
          as="form"
          onSubmit={handleFormSubmit}
          className="flex flex-col items-start gap-4 max-w-[500px] mx-auto "
        >
          <Image
            src="/agri-connect-logo.png"
            alt="agri-connect-logo"
            width={100}
            height={100}
            className="mx-auto pt-8"
          />
          <Heading>Create New Product</Heading>
          <Text>
            Fill out the form below to create a new product for your farm. you
            cannot edit the product once it is created. *
          </Text>
          <Divider />
          <FormLabel>Product Data</FormLabel>
          <Input
            name="productName"
            type="text"
            value={inputs.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            variant="filled"
          />
          <Input
            name="productDescription"
            type="text"
            value={inputs.productDescription}
            onChange={handleInputChange}
            placeholder="Product Description"
            variant="filled"
          />

          <div className="flex flex-col">
            <FormLabel>Product Price</FormLabel>
            <Input
              name="productPrice"
              type="number"
              value={inputs.productPrice}
              onChange={handleInputChange}
              placeholder="Product Price"
              variant="filled"
            />
            <FormLabel className="pt-2">per</FormLabel>
            <Input
              name="productPricePer"
              type="text"
              value={inputs.productPricePer}
              onChange={handleInputChange}
              placeholder="ex. kilo, piece, etc."
              variant="filled"
            />
          </div>
          <Divider />
          {image && (
            <div>
              <Image
                src={URL.createObjectURL(image)}
                alt="product-image"
                width={300}
                height={200}
                className="mx-auto h-[200px] w-[300px] rounded-md bg-gray-500 p-[1px]"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          )}
          <input
            type="file"
            multiple={false}
            hidden
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageInputChange}
          />
          <Button
            type="button"
            leftIcon={<FaImage />}
            colorScheme={colorMode === "light" ? "teal" : "whatsapp"}
            onClick={handleImageUploadClick}
          >
            Upload Product Image
          </Button>
          <Divider />

          <Button
            leftIcon={<MdLibraryAdd />}
            type="submit"
            colorScheme={colorMode === "light" ? "teal" : "linkedin"}
            w="full"
            disabled={!!image}
          >
            Create Product
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default CreateProduct;
