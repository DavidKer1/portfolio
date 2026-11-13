import { en } from "./en";
import { es } from "./es";

export type Lang = "es" | "en";

export function copy(lang: Lang) {
	return lang === "en" ? en : es;
}

export const correo = "dev@victorsanchez.mx";

// El número de WhatsApp se quitó del sitio el 2026-11-13 porque llegaban llamadas de spam.
// Los botones abren un correo con el mensaje ya escrito.
export function escribeme(mensaje: string) {
	return `mailto:${correo}?body=${encodeURIComponent(mensaje)}`;
}
