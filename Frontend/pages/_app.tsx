import { mainChakraTheme } from "@/components/Layout/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Navbar from "@/components/Layout/Navbar";
import "@fontsource-variable/inter";
import "@fontsource-variable/spline-sans";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={mainChakraTheme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
