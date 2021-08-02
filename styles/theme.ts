import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
	initialColorMode: "dark",
};

export const theme = extendTheme({
	config,
	styles: {
		global: (props) => ({
			a: {
				transition: "color 0.35s",
				transitionTimingFunction: "ease-out",
				_hover: {
					color: mode("blue.700", "blue.300")(props),
				},
			},
		}),
	},
	fonts: {
		heading: "Poppins",
		body: "Roboto",
	},
});
