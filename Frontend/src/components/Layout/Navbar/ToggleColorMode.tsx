import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggleColorMode = () => {
    toggleColorMode();
  };
  return (
    <Button onClick={handleToggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ToggleColorMode;
