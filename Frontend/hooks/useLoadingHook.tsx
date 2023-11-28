import { Button } from "@chakra-ui/react";
import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  const loadingSpinner = isLoading ? (
    <Button
      isLoading
      loadingText="Loading"
      colorScheme="teal"
      variant="outline"
      spinnerPlacement="start"
      type="button"
    ></Button>
  ) : (
    <></>
  );

  return { isLoading, setIsLoading, loadingSpinner};
};
