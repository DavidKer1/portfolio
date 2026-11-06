for (const boton of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
	const original = boton.textContent ?? "";
	boton.addEventListener("click", async () => {
		try {
			await navigator.clipboard.writeText(boton.dataset.copy ?? "");
			boton.textContent = boton.dataset.copied ?? original;
			setTimeout(() => {
				boton.textContent = original;
			}, 1800);
		} catch {
			location.href = `mailto:${boton.dataset.copy}`;
		}
	});
}

// El formulario arma un enlace mailto. Un form con action mailto: en una página
// HTTPS se marca como contenido mixto, así que sin JavaScript se oculta y queda
// el enlace directo al correo.
const formulario = document.querySelector<HTMLFormElement>("[data-mail-form]");
formulario?.addEventListener("submit", (e) => {
	e.preventDefault();
	const datos = new FormData(formulario);
	const asunto = encodeURIComponent(String(datos.get("subject")));
	const cuerpo = encodeURIComponent(String(datos.get("body")));
	location.href = `mailto:${formulario.dataset.mailto}?subject=${asunto}&body=${cuerpo}`;
	const aviso = formulario.querySelector<HTMLElement>("[data-mail-status]");
	if (aviso) aviso.hidden = false;
});
