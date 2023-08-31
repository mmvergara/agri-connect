import { extendTheme } from "@chakra-ui/react";

export const mainChakraTheme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    heading: `"Spline Sans Variable", sans-serif`,
    body: `"Inter Variable", sans-serif`,
  },
});
