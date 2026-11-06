import { en } from "./en";
import { es } from "./es";

export type Lang = "es" | "en";

export function copy(lang: Lang) {
	return lang === "en" ? en : es;
}

export const correo = "dev@victorsanchez.mx";
