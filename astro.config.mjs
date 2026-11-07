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
			name: "Figtree",
			cssVariable: "--font-figtree",
			fallbacks: ["system-ui", "sans-serif"],
			options: {
				variants: [
					{
						weight: "300 900",
						style: "normal",
						src: ["./src/assets/fonts/figtree-variable.woff2"],
					},
				],
			},
		},
	],
});
