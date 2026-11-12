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
import cabanas from "./assets/hospedaje-y-eventos/cabanas.jpg";
import hacienda from "./assets/hospedaje-y-eventos/hacienda.jpg";
import hotel from "./assets/hospedaje-y-eventos/hotel.jpg";
import parras from "./assets/hospedaje-y-eventos/parras.jpg";
import salon from "./assets/hospedaje-y-eventos/salon.jpg";
import terraza from "./assets/hospedaje-y-eventos/terraza.jpg";
import barberia from "./assets/belleza/barberia.jpg";
import clinica from "./assets/belleza/clinica.jpg";
import colorista from "./assets/belleza/colorista.jpg";
import novias from "./assets/belleza/novias.jpg";
import spa from "./assets/belleza/spa.jpg";
import tatuajes from "./assets/belleza/tatuajes.jpg";
import fierro from "./assets/fitness/fierro.jpg";
import laEsquina from "./assets/fitness/la-esquina.jpg";
import laja from "./assets/fitness/laja.jpg";
import rodada from "./assets/fitness/rodada.jpg";
import tanda from "./assets/fitness/tanda.jpg";
import vertebra from "./assets/fitness/vertebra.jpg";
import alameda from "./assets/profesionales/alameda.jpg";
import calicanto from "./assets/profesionales/calicanto.jpg";
import capaCero from "./assets/profesionales/capa-cero.jpg";
import cosquillas from "./assets/profesionales/cosquillas.jpg";
import diecisiete from "./assets/profesionales/diecisiete.jpg";
import hocico from "./assets/profesionales/hocico.jpg";

// Catálogos de demos por giro. Los textos viven en src/i18n bajo la misma clave.
export type Giro = "restaurants" | "realEstate" | "stays" | "beauty" | "fitness" | "professionals";

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
	// Color del giro: degradado de la portada y del contacto, de arriba abajo. El segundo
	// tono también pinta las píldoras de la página y la tarjeta del catálogo en la portada.
	// La forma del vidrio de cada giro está en global.css.
	tono: [string, string];
}

export const catalogos: Record<Giro, Catalogo> = {
	restaurants: {
		demos: "https://demos.victorsanchez.mx",
		portadas: { burritos, pizzeria, hamburguesas, fonda, asador, cafe },
		tarjeta: "burritos",
		flotantes: ["burritos", "fonda", "pizzeria", "cafe"],
		// Ámbar de maíz.
		tono: ["#ffc65a", "#ffe7b5"],
	},
	realEstate: {
		demos: "https://bienes-raices.victorsanchez.mx",
		portadas: { casas, locales, campestre, torre, naves, despacho },
		tarjeta: "torre",
		flotantes: ["casas", "torre", "locales", "campestre"],
		// Andén Sur tiene versión en inglés.
		rutasEn: { naves: "naves/en" },
		// Cielo de render, azul grisáceo.
		tono: ["#a9c4d8", "#e4ecf2"],
	},
	stays: {
		demos: "https://hospedaje.victorsanchez.mx",
		portadas: { salon, terraza, cabanas, parras, hotel, hacienda },
		tarjeta: "salon",
		flotantes: ["salon", "hotel", "cabanas", "hacienda"],
		// Salvia de la sierra.
		tono: ["#9fd3b6", "#def1e6"],
	},
	beauty: {
		demos: "https://belleza.victorsanchez.mx",
		portadas: { barberia, tatuajes, novias, colorista, spa, clinica },
		tarjeta: "colorista",
		flotantes: ["colorista", "tatuajes", "spa", "barberia"],
		// Rosa polvo.
		tono: ["#f5b9c4", "#fde7eb"],
	},
	fitness: {
		demos: "https://fitness.victorsanchez.mx",
		portadas: { fierro, "la-esquina": laEsquina, tanda, laja, rodada, vertebra },
		tarjeta: "la-esquina",
		flotantes: ["la-esquina", "rodada", "fierro", "vertebra"],
		// Coral de pista, más bajo que el de la prueba.
		tono: ["#ffab88", "#ffe2d6"],
	},
	professionals: {
		demos: "https://profesionales.victorsanchez.mx",
		portadas: { hocico, alameda, cosquillas, diecisiete, "capa-cero": capaCero, calicanto },
		tarjeta: "hocico",
		flotantes: ["hocico", "diecisiete", "calicanto", "cosquillas"],
		// Lila de tinta de sello.
		tono: ["#c9b8f2", "#ece6fc"],
	},
};

// Orden en la portada y en el pie.
export const giros: Giro[] = ["restaurants", "realEstate", "stays", "beauty", "fitness", "professionals"];
