import { en } from "./en";
import { es } from "./es";

export type Lang = "es" | "en";

export function copy(lang: Lang) {
	return lang === "en" ? en : es;
}

export const correo = "dev@victorsanchez.mx";

export const telefono = "528443006533";

export function whatsapp(lang: Lang) {
	return `https://wa.me/${telefono}?text=${encodeURIComponent(copy(lang).whatsapp)}`;
}
