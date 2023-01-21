import { globalStyle } from "@/styles/globalStyle";
import { theme } from "@/theme";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import DefaultLayout from "@/components/global/DefaultLayout";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Global styles={globalStyle} />
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ChakraProvider>
  );
}
