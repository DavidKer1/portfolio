import type { ImageMetadata } from "astro";
import type { Lang } from "./i18n";

// Capturas de cada proyecto. Los textos (pie de cada captura, títulos de grupo y la
// página entera) viven en src/i18n bajo `projects.<id>`, con las mismas claves.
// Las imágenes están en src/assets/proyectos/<id>/: las de computadora a 1600 × 1000
// (una pantalla de 1440 × 900) y las de celular a 780 de ancho (390 a 2×).

export type ProyectoId = "apuntafy" | "sonrisas" | "peoplecor" | "scholastico" | "tintely" | "zenlift";

// web: marco de navegador. movil: marco de celular. libre: la imagen ya trae su
// propio aparato (las imágenes del sitio de PeopleCor) y va sobre un panel claro.
export type Marco = "web" | "movil" | "libre";

interface Grupo {
	id: string;
	marco: Marco;
	// Lo que se lee en la barra del navegador, solo en los grupos web.
	url?: string;
	capturas: string[];
	// Capturas web más anchas que una pantalla, que ocupan toda la fila.
	anchas?: string[];
}

interface Proyecto {
	slug: string;
	// Degradado de la portada y del contacto. El segundo tono pinta las píldoras.
	tono: [string, string];
	// La portada de la tarjeta y de la página: un navegador con un celular encima,
	// o tres celulares cuando el proyecto no tiene web.
	portada: { web?: string; url?: string; moviles: string[] };
	grupos: Grupo[];
}

// Las capturas de los proyectos ocultos (más abajo) quedan fuera para que ni siquiera
// se copien al sitio publicado. Si un proyecto sale de `ocultos`, sácalo también de aquí.
const archivos = import.meta.glob<{ default: ImageMetadata }>(["./assets/proyectos/*/*.webp", "!./assets/proyectos/peoplecor/*"], {
	eager: true,
});

export function captura(id: ProyectoId, nombre: string): ImageMetadata {
	const archivo = archivos[`./assets/proyectos/${id}/${nombre}.webp`];
	if (!archivo) throw new Error(`Falta la captura ${id}/${nombre}.webp`);
	return archivo.default;
}

export const orden: ProyectoId[] = ["apuntafy", "sonrisas", "peoplecor", "scholastico", "tintely", "zenlift"];

// Proyectos en rediseño (noviembre de 2026): su página no se publica todavía y la
// tarjeta de la portada lleva a su sitio. Al terminar el rediseño, retoma las capturas
// y sácalos de esta lista.
const enRediseno: ProyectoId[] = ["apuntafy"];

// Proyectos ocultos por ahora: sin tarjeta, sin página y sin mención en la portada.
// PeopleCor queda fuera mientras Victor trabaje ahí. Sus textos y capturas se quedan
// para volver a mostrarlo: sácalo de esta lista y del filtro de `archivos`.
const ocultos: ProyectoId[] = ["peoplecor"];

export const visible = (id: ProyectoId) => !ocultos.includes(id);
export const tienePagina = (id: ProyectoId) => visible(id) && !enRediseno.includes(id);
export const conPagina = orden.filter(tienePagina);

export const proyectos: Record<ProyectoId, Proyecto> = {
	apuntafy: {
		slug: "apuntafy",
		// Lila de la marca.
		tono: ["#c4b5ff", "#ece7ff"],
		portada: { web: "inicio", url: "apuntafy.com", moviles: ["m-servicios"] },
		grupos: [
			{
				id: "web",
				marco: "web",
				url: "apuntafy.com",
				capturas: ["reserva", "inicio", "como-funciona", "precios", "registro"],
				anchas: ["reserva"],
			},
			{
				id: "movil",
				marco: "movil",
				capturas: ["m-servicios", "m-hero", "m-reservan", "m-mensajes", "m-esencial", "m-precios", "m-registro"],
			},
		],
	},
	sonrisas: {
		slug: "sonrisas-mexicanas",
		// Azul lavanda, de la pantalla de bienvenida.
		tono: ["#b0b8fa", "#e5e8fe"],
		portada: { moviles: ["m-inicio", "m-acceso", "m-chat"] },
		grupos: [{ id: "movil", marco: "movil", capturas: ["m-bienvenida", "m-acceso", "m-inicio", "m-chat"] }],
	},
	peoplecor: {
		slug: "peoplecor",
		// Cielo de la barra de PeopleCor.
		tono: ["#9fdcf3", "#e2f5fc"],
		portada: { web: "inicio", url: "peoplecor.com", moviles: ["m-inicio"] },
		grupos: [
			{ id: "producto", marco: "libre", capturas: ["panel", "app"] },
			{ id: "web", marco: "web", url: "peoplecor.com", capturas: ["inicio"] },
		],
	},
	scholastico: {
		slug: "scholastico",
		// Verde lima del camión.
		tono: ["#d2e88a", "#f1f8d8"],
		portada: { moviles: ["m-mapa", "m-menu", "m-inicio"] },
		grupos: [{ id: "movil", marco: "movil", capturas: ["m-inicio", "m-menu", "m-mapa"] }],
	},
	tintely: {
		slug: "tintely",
		// Champaña y kraft, de los papeles del sitio.
		tono: ["#e8d3ad", "#f7eee0"],
		portada: { web: "inicio", url: "tintely.com", moviles: ["m-inicio"] },
		grupos: [
			{
				id: "web",
				marco: "web",
				url: "tintely.com",
				capturas: ["inicio", "negocio", "evento", "destacado", "precios", "proyecto", "como"],
				anchas: ["inicio"],
			},
			{
				id: "movil",
				marco: "movil",
				capturas: ["m-inicio", "m-negocio", "m-evento", "m-destacado", "m-precios", "m-proyecto", "m-como", "m-links"],
			},
		],
	},
	zenlift: {
		slug: "zenlift",
		// Salvia, del fondo de sus fotos.
		tono: ["#bcd6b3", "#e9f2e5"],
		portada: { moviles: ["m-inicio", "m-entrenamiento", "m-ejercicio"] },
		grupos: [
			{
				id: "movil",
				marco: "movil",
				capturas: ["m-inicio", "m-biblioteca", "m-ejercicio", "m-entrenamiento", "m-historial"],
			},
			{ id: "web", marco: "web", url: "zenlift.app", capturas: ["features", "progress", "routines"], anchas: ["features"] },
		],
	},
};

export function rutaProyecto(lang: Lang, id: ProyectoId) {
	const slug = proyectos[id].slug;
	return lang === "en" ? `/en/projects/${slug}/` : `/proyectos/${slug}/`;
}

export function totalCapturas(id: ProyectoId) {
	return proyectos[id].grupos.reduce((n, g) => n + g.capturas.length, 0);
}
