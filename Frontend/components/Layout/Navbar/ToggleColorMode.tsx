import { Button, Icon, useColorMode } from "@chakra-ui/react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggleColorMode = () => toggleColorMode();

  return (
    <Button
      onClick={handleToggleColorMode}
      colorScheme="blackAlpha"
      color="green.100"
      p={1}
    >
      {colorMode === "light" ? (
        <Icon as={BsMoonStarsFill} />
      ) : (
        <Icon as={FaSun} />
      )}
    </Button>
  );
};

export default ToggleColorMode;
