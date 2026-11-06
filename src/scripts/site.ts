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

// Sin JavaScript, el formulario manda los espacios como "+" a algunos clientes
// de correo. Con JavaScript se arma el enlace con la codificación correcta.
const formulario = document.querySelector<HTMLFormElement>("[data-mail-form]");
formulario?.addEventListener("submit", (e) => {
	e.preventDefault();
	const datos = new FormData(formulario);
	const asunto = encodeURIComponent(String(datos.get("subject")));
	const cuerpo = encodeURIComponent(String(datos.get("body")));
	location.href = `${formulario.action}?subject=${asunto}&body=${cuerpo}`;
	const aviso = formulario.querySelector<HTMLElement>("[data-mail-status]");
	if (aviso) aviso.hidden = false;
});
