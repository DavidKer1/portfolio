import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from '../styles/theme';
import Layout from '../layouts/Layout';

import "../styles/globals.css";
import "../styles/fonts"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme} >
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <Layout>
			  <Component {...pageProps} />
      </Layout>
		</ChakraProvider>
	);
}
export default MyApp;
