# victorsanchez.mx

Sitio de Victor Sanchez: desarrollo de productos con IA. Astro 7, salida estática, sin frameworks de UI ni scripts de terceros.

## Comandos

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm check     # tipos y plantillas
pnpm build     # genera dist/
pnpm preview   # sirve dist/
```

Requiere Node 22.23.4 o superior.

## Dónde está cada cosa

- `src/i18n/es.ts` y `en.ts`: todos los textos. Español en `/`, inglés en `/en/`.
- `src/components/`: portada, encabezado y pie.
- `src/i18n/index.ts`: correo y número de WhatsApp.
- `src/proyectos.ts` y `src/assets/proyectos/<id>/`: las capturas de cada proyecto y cómo se agrupan en su página (`/proyectos/<slug>/`). Los textos de esas páginas están en `src/i18n`, bajo `projects`.
- `_referencia/`: copia local de la versión anterior, solo para consulta. Git la ignora.

## Despliegue en Coolify

Build pack **Dockerfile**, puerto 80. El `Dockerfile` construye con Node 24 y sirve `dist/` con nginx (`nginx.conf`), con caché larga para `/_astro/` y la página 404 propia.
