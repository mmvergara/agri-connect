import { useAuth } from "@/context/AuthContext";
import { createProduct } from "@/services/ProductService";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Divider,
  Button,
  Heading,
  Text,
  createStandaloneToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, FormEvent, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";

const CreateProduct = () => {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = createStandaloneToast();
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
    if (error) {
      return;
    }

    toast({ title: "Product created successfully", status: "success" });
    router.push(`/product/${data.productID.toString()}`);
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

  useEffect(() => {
    if (!auth.user) {
      router.push("/auth");
    }
  }, [auth.user]);

  return (
    <>
      <Head>
        <title>AgriConnect | Create Product</title>
      </Head>
      <Container
        bg="white"
        minH="100vh"
        maxW="container.md"
        className="shadow-lg"
      >
        <FormControl
          isRequired
          as="form"
          onSubmit={handleFormSubmit}
          className="mx-auto flex max-w-[500px] flex-col items-start gap-4 "
        >
          <Image
            src="/agri-connect-logo.png"
            alt="agri-connect-logo"
            width={100}
            height={100}
            className="mx-auto pt-8"
          />
          <Heading className="font-poppins">Create New Product</Heading>
          <Text>
            Fill out the form below to create a new product for your farm. you
            cannot edit the product once it is created. *
          </Text>
          <Divider />
          <FormLabel>Product Data</FormLabel>
          <Input
            data-cy="product-name-input"
            name="productName"
            type="text"
            value={inputs.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            variant="filled"
          />
          <Input
            data-cy="product-description-input"
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
              data-cy="product-price-input"
              name="productPrice"
              type="number"
              value={inputs.productPrice}
              onChange={handleInputChange}
              placeholder="Product Price"
              variant="filled"
            />
            <FormLabel className="pt-2">per</FormLabel>
            <Input
              data-cy="product-price-per-input"
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
            data-cy="product-image-input"
            type="file"
            multiple={false}
            hidden
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageInputChange}
          />
          <Button
            data-cy="upload-product-image-button"
            type="button"
            leftIcon={<FaImage />}
            colorScheme={"teal"}
            onClick={handleImageUploadClick}
          >
            Upload Product Image
          </Button>
          <Divider />

          <Button
            data-cy="submit-product-button"
            leftIcon={<MdLibraryAdd />}
            type="submit"
            colorScheme={"teal"}
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
