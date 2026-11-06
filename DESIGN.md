# Diseño

Sitio oscuro con la estructura y el nivel de acabado de marius.dev, elegido por Victor. Se quedó sin su lima, su degradado ni sus etiquetas mono.

## Idea

El modelo es una parada en una línea larga. Por eso el elemento gráfico que se repite es un riel con paradas, y la parada del modelo siempre va en ámbar. El riel aparece en la corrida de la portada, en la lista de paradas y en los diagramas de los casos.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#131416` | Fondo |
| `--raised` | `#1b1d20` | Bandas y la corrida |
| `--line` | `#303338` | Filetes |
| `--rail` | `#6b6f76` | Riel de las rutas, con contraste de 3:1 |
| `--text` | `#f2f2ed` | Texto |
| `--muted` | `#b0b3ad` | Texto secundario |
| `--accent` | `#ffb224` | Modelo, cifra clave, precio, acción principal, cierre de contacto |
| `--bad` | `#ff8466` | Solo fallos reales del modelo y ramas de fallo |
| `--good` | `#93d79a` | Solo corridas correctas |

El ámbar no decora: si todo es ámbar, deja de señalar. Los enlaces van en color de texto.

## Tipografía

- **Archivo** (variable, con eje de ancho) para todo: titulares a 104-106 % de ancho y peso 700.
- **Spline Sans Mono** solo para correos, salidas del modelo y código. Nunca para etiquetas.
- Títulos en mayúscula inicial de oración. Sin mayúsculas sostenidas.

## Reglas

- Sin tarjetas iguales, eyebrows, pastillas, flechas decorativas, gradientes de texto ni números de sección. Los únicos números de lista son las cinco condiciones de Apuntafy, porque el runbook las enumera.
- Las imágenes son del producto real. Cada panel toma el color de su producto.
- Un solo movimiento automático: la corrida recorre el riel al cargar y al cambiar de pestaña. Respeta `prefers-reduced-motion`.
- Una sola interacción de argumento: quitar la revisión humana y ver qué saldría.
- Todo funciona sin JavaScript: sin él, las corridas se muestran una tras otra y el formulario abre el correo directo.

## Texto

Español mexicano, primera persona, tuteo. Cada frase afirma algo que se puede comprobar o admite un límite. Toda cifra sale de un repo, de `evals/` o de un dato confirmado por Victor. Si no tiene fuente, no entra.
