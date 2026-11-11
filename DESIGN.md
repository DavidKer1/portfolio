# Diseño

Victor eligió el 2026-11-06 el estilo de usehalo.com. Se replican su estructura y su lenguaje visual con código, textos e imágenes propios.

## Estructura

1. Encabezado sobre la portada: logotipo en mayúsculas, menú en píldora blanca al centro, botón de idioma y "Escríbeme" en crema.
2. Portada con degradado cian, titular azul marino muy grueso y centrado, forma de vidrio detrás y capturas reales de proyectos flotando. Botones: WhatsApp (marino) y "Ver proyectos" (blanco). Debajo, el correo con botón de copiar.
3. Franja con los nombres de los proyectos en mayúsculas.
4. "Lo que hago": título en dos colores y pestañas. Cada pestaña es una tarjeta marina con texto a la izquierda y capturas a la derecha.
5. Proyectos sobre una franja marina con borde superior curvo, en tarjetas blancas.
6. "Cómo trabajamos": cuatro tarjetas blancas numeradas.
7. "Sobre mí": tarjeta blanca con texto breve y tecnologías.
8. Contacto en franja cian con borde curvo. Línea para agencias solo en inglés.
9. Pie marino con un "VICTOR" enorme en cian.

Al final de Proyectos hay una tarjeta ancha que lleva a «Páginas para restaurantes» (`/restaurantes/` y `/en/restaurants/`). Esa página repite la portada (vidrio y capturas flotando), muestra las seis demos en tarjetas sobre la franja marina, lo que incluye cada página y el contacto. Las demos viven en `demos.victorsanchez.mx`, en el repo aparte `demos-restaurantes`.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#062044` | Texto y botón principal |
| `--navy-band` | `#0a2d58` | Franjas y tarjetas de servicios |
| `--cyan` / `--cyan-light` | `#14c8f5` / `#8fe4f8` | Degradado de portada y contacto |
| `--cyan-ink` | `#0087b8` | Primera línea de títulos grandes sobre fondo claro |
| `--cyan-text` | `#00729b` | Texto chico cian sobre blanco (contraste AA) |
| `--ice` | `#e8f7fc` | Fondo general |
| `--cream` / `--orange` | `#ffe7ad` / `#ffcf7a` | Botón "Escríbeme" y píldoras |

Tipografía: Figtree (libre, geométrica, parecida a la Centra de Halo), títulos en 800 con tracking muy cerrado y botones en mayúsculas.

## Animación

Con GSAP (ScrollTrigger) y Lenis, igual que usehalo.com, en `src/scripts/motion.ts`.

- **Entrada:** el encabezado baja, la forma de vidrio crece girando, el titular sube línea por línea desde una máscara, luego aparecen el texto y los botones, y al final las capturas entran una tras otra con rebote.
- **Scroll suave** con Lenis, también en los enlaces del menú.
- **Portada al bajar:** parallax con una velocidad distinta por captura, el vidrio crece y el texto se desvanece.
- **Títulos de sección:** la píldora aparece y cada línea sube desde su máscara.
- **Bloques:** pestañas, tarjetas de servicio, proyectos, pasos y "Sobre mí" suben en cascada al entrar.
- **Franjas curvas:** el borde se aplana conforme la franja sube.
- **Franja de nombres:** se desliza sola y se detiene al pasar el ratón.
- **Pie:** las letras de "VICTOR" suben una por una.

Con "reducir movimiento" no hay animaciones ni scroll suave. Sin JavaScript todo se ve completo. La clase `anim` del `<head>` oculta la portada antes de pintar y se quita sola a los 3 s si el script no carga.

## Texto

Corto y llano, como se le explica a un cliente por WhatsApp. Nada de eslóganes ni frases "de agencia". Victor corrige lo que no diría.

## Reglas

- Apuntafy es un proyecto más. Saltillo no aparece en la portada.
- Nada que no sea cierto: sin testimonios, logos ni cifras inventadas.
- PeopleCor sin cifras ni rol actual. Turnimo fuera. Nombres de pacientes difuminados.
