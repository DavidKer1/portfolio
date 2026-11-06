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
