import type { ImageMetadata } from "astro";
import asador from "./assets/restaurantes/asador.jpg";
import burritos from "./assets/restaurantes/burritos.jpg";
import cafe from "./assets/restaurantes/cafe.jpg";
import fonda from "./assets/restaurantes/fonda.jpg";
import hamburguesas from "./assets/restaurantes/hamburguesas.jpg";
import pizzeria from "./assets/restaurantes/pizzeria.jpg";
import campestre from "./assets/bienes-raices/campestre.jpg";
import casas from "./assets/bienes-raices/casas.jpg";
import despacho from "./assets/bienes-raices/despacho.jpg";
import locales from "./assets/bienes-raices/locales.jpg";
import naves from "./assets/bienes-raices/naves.jpg";
import torre from "./assets/bienes-raices/torre.jpg";

// Catálogos de demos por giro. Los textos viven en src/i18n bajo la misma clave.
export type Giro = "restaurants" | "realEstate";

interface Catalogo {
	// Dominio donde viven las demos; cada tarjeta enlaza a `${demos}/${id}/`.
	demos: string;
	portadas: Record<string, ImageMetadata>;
	// La captura de su tarjeta en la portada del sitio.
	tarjeta: string;
	// Las cuatro capturas que flotan en la portada del catálogo, en orden f1–f4.
	flotantes: [string, string, string, string];
	// Rutas distintas para la página en inglés (por ejemplo, una demo con versión en inglés).
	rutasEn?: Record<string, string>;
}

export const catalogos: Record<Giro, Catalogo> = {
	restaurants: {
		demos: "https://demos.victorsanchez.mx",
		portadas: { burritos, pizzeria, hamburguesas, fonda, asador, cafe },
		tarjeta: "burritos",
		flotantes: ["burritos", "fonda", "pizzeria", "cafe"],
	},
	realEstate: {
		demos: "https://bienes-raices.victorsanchez.mx",
		portadas: { casas, locales, campestre, torre, naves, despacho },
		tarjeta: "torre",
		flotantes: ["casas", "torre", "locales", "campestre"],
		// Andén Sur tiene versión en inglés.
		rutasEn: { naves: "naves/en" },
	},
};

// Orden en la portada y en el pie.
export const giros: Giro[] = ["restaurants", "realEstate"];
