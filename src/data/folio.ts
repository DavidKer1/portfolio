// Todas las cifras de Folio salen de estos archivos. Si se corre otra
// evaluación, el sitio se actualiza solo y nadie retoca los números a mano.
import v1Casos from "../../evals/folio/v1-casos.json";
import v1Ciegos from "../../evals/folio/v1-ciegos.json";
import v1Nuevos from "../../evals/folio/v1-nuevos.json";
import v2Casos from "../../evals/folio/v2-casos.json";
import v2Ciegos from "../../evals/folio/v2-ciegos.json";
import v2Nuevos from "../../evals/folio/v2-nuevos.json";

export interface Articulo {
	descripcion: string;
	cantidad: number | null;
}

export interface Pedido {
	cliente: string | null;
	referencia: string | null;
	entrega: string | null;
	destino: string | null;
	articulos: Articulo[];
}

interface Corrida {
	id: string;
	tipo: string;
	correo: string;
	resultado: Pedido | null;
	error: string | null;
	articulos_ok: boolean;
	inventados: string[];
	correcto: boolean;
	segundos: number;
	crudo: string | null;
}

interface Resultados {
	carga_segundos: number;
	casos: number;
	casos_correctos: number;
	corridas: Corrida[];
}

const v1 = {
	casos: v1Casos as Resultados,
	nuevos: v1Nuevos as Resultados,
	ciegos: v1Ciegos as Resultados,
};
const v2 = {
	casos: v2Casos as Resultados,
	nuevos: v2Nuevos as Resultados,
	ciegos: v2Ciegos as Resultados,
};

// Quedan fuera dos casos de tipo "inyección" que no prueban obediencia:
// en `n-inyeccion-cortes` el remitente dice que olvidó mencionar esos artículos,
// y en `inyeccion-negocio` el pedido no tiene campo de precio donde obedecer.
const inyecciones = [
	"inyeccion-directa",
	"inyeccion-disfrazada",
	"n-inyeccion-admin",
	"n-inyeccion-firma",
	"c-comentario-oculto",
	"c-aviso-legal",
	"c-historial-falso",
];

function todas(version: typeof v1) {
	return [
		...version.casos.corridas,
		...version.nuevos.corridas,
		...version.ciegos.corridas,
	];
}

function mediana(valores: number[]) {
	const orden = [...valores].sort((a, b) => a - b);
	const medio = orden.length / 2;
	return Number.isInteger(medio)
		? (orden[medio - 1] + orden[medio]) / 2
		: orden[Math.floor(medio)];
}

function puntaje(r: Resultados) {
	return { ok: r.casos_correctos, n: r.casos };
}

function resumen(version: typeof v1) {
	const corridas = todas(version);
	return {
		ajuste: puntaje(version.casos),
		nuevos: puntaje(version.nuevos),
		ciegos: puntaje(version.ciegos),
		obedecio: corridas.filter(
			(r) => inyecciones.includes(r.id) && !r.articulos_ok,
		).length,
		inyecciones: inyecciones.length,
		inventados: corridas.filter((r) => r.inventados.length > 0).length,
		segundos: mediana(corridas.map((r) => r.segundos)),
	};
}

export const evaluacion = {
	original: resumen(v1),
	corregido: resumen(v2),
	correos: todas(v1).length,
	cargaSegundos: v1.casos.carga_segundos,
};

function buscar(lista: Corrida[], id: string) {
	const corrida = lista.find((r) => r.id === id);
	if (!corrida) throw new Error(`No existe la corrida ${id}`);
	return corrida;
}

export function corridaOriginal(id: string) {
	return buscar(todas(v1), id);
}

export const prompts = {
	original: v1Nuevos.prompt,
	corregido: v2Casos.prompt,
};

function conjunto(id: string) {
	if (id.startsWith("c-")) return "ciego";
	if (id.startsWith("n-")) return "nuevo";
	return "ajuste";
}

const filas = todas(v1).map((original) => {
	const corregida = buscar(todas(v2), original.id);
	return {
		id: original.id,
		tipo: original.tipo,
		correo: original.correo,
		conjunto: conjunto(original.id),
		original,
		corregida,
	};
});

const conFallo = (f: (typeof filas)[number]) =>
	!f.original.correcto || !f.corregida.correcto;

// Primero los correos donde algo falló, porque son los que vale la pena leer.
export const comparacion = [
	...filas.filter(conFallo),
	...filas.filter((f) => !conFallo(f)),
];
