import {
  deleteProductByID,
  updateProductPrice,
} from "@/services/ProductService";
import { ProductData } from "@/types/shared-types";

import { Tr, Td, Button, Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  product: ProductData;
  onProductDelete: (productID: string) => void;
  onProductPriceUpdate: (productID: string, newPrice: number) => void;
};

const ProductRow = (props: Props) => {
  const toast = useToast();
  const { product, onProductDelete, onProductPriceUpdate } = props;
  const [productPrice, setProductPrice] = useState(product.productPrice);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleUpdatePrice = async () => {
    setUpdateLoading(true);
    const { data, error } = await updateProductPrice(
      product.productID,
      productPrice,
    );
    if (error) {
      console.log(error);
    } else {
      toast({
        title: "Product Price Updated",
        description: `Product price of ${product.productName} is now ₱ ${data.productPrice}`,
        status: "success",
        isClosable: true,
      });
      onProductPriceUpdate(product.productID, data.productPrice);
    }
    setUpdateLoading(false);
  };
  const handleDeleteProduct = async () => {
    setDeleteLoading(true);
    const { error } = await deleteProductByID(product.productID);
    if (error) {
      console.log(error);
    } else {
      toast({
        title: "Product Deleted",
        description: `${product.productName} has been deleted`,
        status: "success",
        isClosable: true,
      });
      onProductDelete(product.productID);
    }
    setDeleteLoading(false);
  };
  return (
    <Tr className="font-semibold">
      <Td>
        <Link
          className="bg-gray-100 hover:underline p-2 rounded-md"
          href={`/product/${product.productID}`}
        >
          {product.productName}
        </Link>
      </Td>
      <Td>
        ₱{product.productPrice} - per {product.productPricePer}
      </Td>
      <Td className="flex flex-col gap-2">
        <Input
          type="number"
          variant="filled"
          placeholder="Enter new price"
          value={productPrice}
          onChange={(e) => setProductPrice(parseInt(e.target.value))}
        />
        <Button
          colorScheme="blue"
          onClick={handleUpdatePrice}
          isLoading={updateLoading}
        >
          Update Price
        </Button>
      </Td>
      <Td>
        <Button
          colorScheme="red"
          onClick={handleDeleteProduct}
          isLoading={deleteLoading}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default ProductRow;
