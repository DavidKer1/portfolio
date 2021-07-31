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
				color: mode("blue.500", "blue.200")(props),
				transition: "color 0.15s",
				transitionTimingFunction: "ease-out",
				fontWeight: "500",
				_hover: {
					color: mode("blue.600", "blue.300")(props),
				},
			},
		}),
	},
});
