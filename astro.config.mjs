// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	site: "https://victorsanchez.mx",
	i18n: {
		defaultLocale: "es",
		locales: ["es", "en"],
		routing: { prefixDefaultLocale: false },
	},
	integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Archivo",
			cssVariable: "--font-archivo",
			fallbacks: ["Arial", "sans-serif"],
			options: {
				variants: [
					{
						weight: "100 900",
						stretch: "62% 125%",
						style: "normal",
						src: ["./src/assets/fonts/archivo-variable.woff2"],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: "Spline Sans Mono",
			cssVariable: "--font-spline",
			fallbacks: ["ui-monospace", "monospace"],
			options: {
				variants: [
					{
						weight: "300 700",
						style: "normal",
						src: ["./src/assets/fonts/spline-sans-mono-variable.woff2"],
					},
				],
			},
		},
	],
});
