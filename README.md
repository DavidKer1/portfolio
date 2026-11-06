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
- `src/data/folio.ts`: lee `evals/folio/*.json`. Las cifras de Folio no se escriben a mano.
- `src/components/`: una pieza por sección y una por caso.
- `src/assets/work/`: capturas reales de cada producto.
- `evals/folio/`: la evaluación de Folio (casos, prompt corregido, script y resultados).
- `_referencia/`: copia local de la versión anterior, solo para consulta. Git la ignora.

## Repetir la evaluación de Folio

Usa el `extract.py` original de Folio sin modificarlo y requiere el modelo local.

```sh
FOLIO="<ruta a pedido-local>"
cd evals/folio
"$FOLIO/.venv/bin/python" evaluar.py "$FOLIO" casos-nuevos.json v1-nuevos.json
"$FOLIO/.venv/bin/python" evaluar.py "$FOLIO" casos.json v2-casos.json prompt-v2.txt
"$FOLIO/.venv/bin/python" evaluar.py "$FOLIO" casos-nuevos.json v2-nuevos.json prompt-v2.txt
"$FOLIO/.venv/bin/python" evaluar.py "$FOLIO" casos-ciegos.json v1-ciegos.json
"$FOLIO/.venv/bin/python" evaluar.py "$FOLIO" casos-ciegos.json v2-ciegos.json prompt-v2.txt
```

- `casos.json`: los 24 con los que se ajustó el prompt.
- `casos-nuevos.json`: 12 escritos junto con el prompt corregido.
- `casos-ciegos.json`: 12 escritos por un agente sin ver el prompt ni los demás casos. Es la cifra que se publica como principal.

Si se cambia el prompt, los casos a ciegas dejan de serlo: hay que escribir otros, sin ver el prompt, antes de volver a publicar esa cifra.

## Despliegue en Coolify

Build pack **Dockerfile**, puerto 80. El `Dockerfile` construye con Node 24 y sirve `dist/` con nginx (`nginx.conf`), con caché larga para `/_astro/` y la página 404 propia.
