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
			name: "Geist",
			cssVariable: "--font-geist",
			fallbacks: ["system-ui", "sans-serif"],
			options: {
				variants: [
					{
						weight: "100 900",
						style: "normal",
						src: ["./src/assets/fonts/geist-variable.woff2"],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: "Geist Mono",
			cssVariable: "--font-geist-mono",
			fallbacks: ["ui-monospace", "monospace"],
			options: {
				variants: [
					{
						weight: "100 900",
						style: "normal",
						src: ["./src/assets/fonts/geist-mono-variable.woff2"],
					},
				],
			},
		},
	],
});
