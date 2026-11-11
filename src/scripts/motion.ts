import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// El script inline del <head> agrega la clase "anim" para ocultar la portada
// antes de pintar. Aquí se arman las animaciones y luego se quita la clase.
const raiz = document.documentElement;
const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducir) {
	gsap.registerPlugin(ScrollTrigger);
	scrollSuave();
	entrada();
	alHacerScroll();
	cambioDePestana();
	window.addEventListener("load", () => ScrollTrigger.refresh());
}
raiz.classList.remove("anim");

function scrollSuave() {
	const lenis = new Lenis({ anchors: { offset: -24 } });
	lenis.on("scroll", ScrollTrigger.update);
	gsap.ticker.add((tiempo) => lenis.raf(tiempo * 1000));
	gsap.ticker.lagSmoothing(0);
}

function entrada() {
	const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
	tl.from(".site-header", { y: -30, autoAlpha: 0, duration: 1.1 }, 0.1);
	if (!document.querySelector(".hero")) return;
	tl.from(".hero-glass", { scale: 0.55, rotate: -40, autoAlpha: 0, duration: 2 }, 0)
		.from(".hero h1 .line-in", { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.15)
		.from(
			[".hero .rest-pill", ".hero .hero-lead", ".hero .hero-actions", ".hero .hero-mail"],
			{ y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.1 },
			0.55,
		)
		.from(
			".float",
			{ y: 70, scale: 0.8, autoAlpha: 0, duration: 1.4, stagger: 0.12, ease: "back.out(1.5)" },
			0.65,
		);
}

function subir(selector: string, distancia = 60) {
	if (!document.querySelector(selector)) return;
	gsap.set(selector, { y: distancia, opacity: 0 });
	ScrollTrigger.batch(selector, {
		start: "top 88%",
		once: true,
		onEnter: (lote) =>
			gsap.to(lote, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out", overwrite: true }),
	});
}

function alHacerScroll() {
	const hero = document.querySelector(".hero");
	if (hero) {
		const recorrido = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
		gsap.to(".hero-inner", { yPercent: 22, opacity: 0.15, ease: "none", scrollTrigger: recorrido });
		gsap.to(".hero-glass-wrap", { scale: 1.3, rotate: 10, ease: "none", scrollTrigger: recorrido });
		for (const capa of gsap.utils.toArray<HTMLElement>("[data-speed]")) {
			gsap.to(capa, { y: Number(capa.dataset.speed) * 2, ease: "none", scrollTrigger: recorrido });
		}
	}

	for (const titulo of gsap.utils.toArray<HTMLElement>("[data-heading]")) {
		const tl = gsap.timeline({
			defaults: { ease: "expo.out" },
			scrollTrigger: { trigger: titulo, start: "top 85%", once: true },
		});
		const pastilla = titulo.querySelector(".pill");
		if (pastilla) tl.from(pastilla, { y: 14, scale: 0.85, opacity: 0, duration: 0.8 });
		tl.from(titulo.querySelectorAll(".line-in"), { yPercent: 115, duration: 1.3, stagger: 0.1 }, 0.08);
		const resto = titulo.querySelectorAll(":scope > .cta-text, :scope > .hero-actions, :scope > .cta-agencies");
		if (resto.length) tl.from(resto, { y: 20, opacity: 0, duration: 1, stagger: 0.08 }, 0.35);
	}

	subir(".strip > p", 20);
	subir(".marquee", 20);
	subir(".tabs", 30);
	subir(".panels", 90);
	subir(".project-card", 90);
	subir(".feature-card", 90);
	subir(".steps li", 70);
	subir(".about-body > *", 30);
	subir(".footer-cols ul", 30);

	const tarjeta = document.querySelector(".about-card");
	if (tarjeta) {
		gsap.from(tarjeta, {
			scale: 0.92,
			opacity: 0,
			duration: 1.3,
			ease: "expo.out",
			scrollTrigger: { trigger: tarjeta, start: "top 85%", once: true },
		});
	}

	// Las franjas suben con el borde muy curvo y se aplanan al acercarse.
	const arco = Math.round(Math.min(260, innerWidth * 0.35));
	for (const banda of gsap.utils.toArray<HTMLElement>(".band-navy, .cta-band")) {
		gsap.fromTo(
			banda,
			{ "--arc": `${arco}px` },
			{ "--arc": "40px", ease: "none", scrollTrigger: { trigger: banda, start: "top bottom", end: "top 25%", scrub: true } },
		);
	}

	const letras = document.querySelectorAll(".footer-logo span");
	if (letras.length) {
		gsap.from(letras, {
			yPercent: 110,
			duration: 1.2,
			stagger: 0.06,
			ease: "expo.out",
			scrollTrigger: { trigger: ".footer-logo", start: "top 98%", once: true },
		});
	}
}

function cambioDePestana() {
	document.addEventListener("tab:change", (evento) => {
		const panel = (evento as CustomEvent<HTMLElement>).detail;
		gsap.fromTo(
			panel.querySelectorAll(".service-text > *"),
			{ y: 18, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "expo.out" },
		);
		gsap.fromTo(
			panel.querySelectorAll(".tile"),
			{ y: 30, scale: 0.94, opacity: 0 },
			{ y: 0, scale: 1, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" },
		);
	});
}
