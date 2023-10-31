import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Navbar from "@/components/Layout/Navbar";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer } = createStandaloneToast();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "top-right", isClosable: true },
      }}
    >
      <AuthProvider>
        <ToastContainer />
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
