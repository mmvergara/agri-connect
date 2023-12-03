import { Button } from "@chakra-ui/react";
import { useState } from "react";

export const useLoading = (currentState:boolean=true) => {
  const [isLoading, setIsLoading] = useState(currentState);

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
