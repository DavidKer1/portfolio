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

// Sin JavaScript, el recuadro de WhatsApp manda el texto como formulario GET.
// Con JavaScript, las sugerencias llenan el campo y el enlace se codifica bien.
const chat = document.querySelector<HTMLFormElement>("[data-chat]");
if (chat) {
	const campo = chat.querySelector<HTMLInputElement>("input[name=text]");
	for (const chip of chat.querySelectorAll<HTMLButtonElement>("[data-chip]")) {
		chip.addEventListener("click", () => {
			if (!campo) return;
			campo.value = chip.dataset.chip ?? "";
			campo.focus();
		});
	}
	chat.addEventListener("submit", (e) => {
		e.preventDefault();
		const texto = campo?.value.trim() || chat.dataset.default || "";
		window.open(`${chat.action}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
	});
}

// Sin servidor, el formulario arma un correo con los datos. Un form con action
// mailto: en HTTPS se marca como contenido mixto, por eso se arma con JavaScript.
const formulario = document.querySelector<HTMLFormElement>("[data-mail-form]");
formulario?.addEventListener("submit", (e) => {
	e.preventDefault();
	const datos = new FormData(formulario);
	const proyecto = String(datos.get("proyecto") ?? "").trim();
	const asunto = `${formulario.dataset.subject}${proyecto ? `: ${proyecto}` : ""}`;
	const cuerpo = `${datos.get("mensaje")}\n\n${datos.get("nombre")}\n${datos.get("correo")}`;
	location.href = `mailto:${formulario.dataset.mailto}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
	const aviso = formulario.querySelector<HTMLElement>("[data-mail-status]");
	if (aviso) aviso.hidden = false;
});
