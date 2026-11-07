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
