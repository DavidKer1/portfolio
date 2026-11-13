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

// Sin JavaScript se ven todas las tarjetas de servicios, una tras otra.
const lista = document.querySelector<HTMLElement>("[data-tabs]");
if (lista) {
	const tabs = [...lista.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
	let actual = tabs[0];

	function mostrar(tab: HTMLButtonElement, enfocar: boolean) {
		for (const otra of tabs) {
			const activa = otra === tab;
			otra.setAttribute("aria-selected", String(activa));
			otra.tabIndex = activa ? 0 : -1;
			const panel = document.getElementById(otra.getAttribute("aria-controls") ?? "");
			panel?.classList.toggle("is-active", activa);
			if (activa && panel && otra !== actual) {
				document.dispatchEvent(new CustomEvent("tab:change", { detail: panel }));
			}
		}
		actual = tab;
		if (enfocar) tab.focus();
	}

	lista.hidden = false;
	tabs.forEach((tab, i) => {
		tab.addEventListener("click", () => mostrar(tab, false));
		tab.addEventListener("keydown", (e) => {
			const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
			if (delta === 0) return;
			e.preventDefault();
			mostrar(tabs[(i + delta + tabs.length) % tabs.length], true);
		});
	});
}

// Visor de capturas en la página de un proyecto. Sin JavaScript, cada captura es un
// enlace a su imagen grande.
const visor = document.querySelector<HTMLDialogElement>("[data-lightbox]");
if (visor) {
	const enlaces = [...document.querySelectorAll<HTMLAnchorElement>("[data-shot]")];
	const img = visor.querySelector<HTMLImageElement>("[data-lightbox-img]");
	const pie = visor.querySelector<HTMLElement>("[data-lightbox-caption]");
	const cuenta = visor.querySelector<HTMLElement>("[data-lightbox-count]");
	const escenario = visor.querySelector<HTMLElement>("[data-lightbox-stage]");
	const de = visor.dataset.of ?? "/";
	let actual = 0;

	const mostrar = (n: number) => {
		actual = (n + enlaces.length) % enlaces.length;
		const enlace = enlaces[actual];
		const texto = enlace.dataset.caption ?? "";
		visor.dataset.marco = enlace.dataset.marco ?? "";
		if (img) {
			img.src = enlace.href;
			img.alt = texto;
		}
		if (pie) pie.textContent = texto;
		if (cuenta) cuenta.textContent = `${actual + 1} ${de} ${enlaces.length}`;
		// Las vecinas se piden de una vez para que la flecha no muestre un hueco.
		for (const d of [1, -1]) new Image().src = enlaces[(actual + d + enlaces.length) % enlaces.length].href;
	};

	// Al apuntar a una captura, su versión grande empieza a bajar antes del clic.
	enlaces.forEach((enlace) =>
		enlace.addEventListener("pointerenter", () => (new Image().src = enlace.href), { once: true }),
	);

	enlaces.forEach((enlace, n) => {
		enlace.addEventListener("click", (e) => {
			if (e.metaKey || e.ctrlKey || e.shiftKey) return;
			e.preventDefault();
			mostrar(n);
			visor.showModal();
		});
	});
	visor.querySelector("[data-lightbox-close]")?.addEventListener("click", () => visor.close());
	visor.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => mostrar(actual - 1));
	visor.querySelector("[data-lightbox-next]")?.addEventListener("click", () => mostrar(actual + 1));
	visor.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") mostrar(actual - 1);
		if (e.key === "ArrowRight") mostrar(actual + 1);
	});
	// Un clic fuera de la imagen cierra el visor.
	visor.addEventListener("click", (e) => {
		if (e.target === visor || e.target === escenario) visor.close();
	});
	visor.addEventListener("close", () => enlaces[actual]?.focus({ preventScroll: true }));

	// Deslizar con el dedo cambia de captura.
	let inicioX = 0;
	visor.addEventListener("touchstart", (e) => {
		inicioX = e.touches[0].clientX;
	}, { passive: true });
	visor.addEventListener("touchend", (e) => {
		const delta = e.changedTouches[0].clientX - inicioX;
		if (Math.abs(delta) > 50) mostrar(actual + (delta < 0 ? 1 : -1));
	});
}
