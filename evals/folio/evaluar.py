"""Evalúa Folio contra casos.json usando su código original, sin modificarlo.

Se reutiliza extract() de pedido-local. Solo se envuelven load y generate para
cargar el modelo una vez y guardar la salida cruda de cada corrida.

    "<carpeta de Folio>/.venv/bin/python" evaluar.py "<carpeta de Folio>" casos.json salida.json [prompt.txt]

Sin prompt.txt se usa el prompt original de Folio. Con él, solo se reemplaza el
prompt en esta corrida; el archivo extract.py no cambia.
"""
import json
import platform
import re
import sys
import time
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

AQUI = Path(__file__).resolve().parent
FOLIO = Path(sys.argv[1]).resolve()
CASOS = AQUI / sys.argv[2]
SALIDA = AQUI / sys.argv[3]
PROMPT = (AQUI / sys.argv[4]) if len(sys.argv) > 4 else None
sys.path.insert(0, str(FOLIO))
import extract as folio  # noqa: E402

CAMPOS = ["cliente", "referencia", "entrega", "destino"]
ISO = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def norm(texto):
    sin_acentos = unicodedata.normalize("NFD", texto.lower())
    limpio = "".join(c for c in sin_acentos if unicodedata.category(c) != "Mn")
    return re.sub(r"\s+", " ", limpio).strip(" .,;:")


def campo_ok(campo, valor, aceptados):
    if valor is None:
        return None in aceptados
    v = norm(valor)
    for a in aceptados:
        if a is None:
            continue
        if campo == "entrega":
            if v == a:
                return True
        elif a == v or a in v or v in a:
            return True
    return False


def cantidad_ok(valor, esperado):
    return valor in esperado if isinstance(esperado, list) else valor == esperado


def articulos_ok(obtenidos, esperados):
    if len(obtenidos) != len(esperados):
        return False
    libres = list(obtenidos)
    for e in esperados:
        for o in libres:
            d = norm(o["descripcion"])
            if any(c in d for c in e["claves"]) and cantidad_ok(o["cantidad"], e["cantidad"]):
                libres.remove(o)
                break
        else:
            return False
    return True


def invento(campo, valor, aceptados):
    """True si el modelo llenó un campo cuyo dato no viene en el correo."""
    if valor is None or None not in aceptados:
        return False
    if campo == "entrega":
        return bool(ISO.match(valor)) and valor not in aceptados
    return not campo_ok(campo, valor, aceptados)


def main():
    casos = json.loads(CASOS.read_text())
    if PROMPT:
        folio.SYSTEM = PROMPT.read_text().strip()
    t0 = time.perf_counter()
    cargado = folio.load(folio.MODEL)
    carga_s = time.perf_counter() - t0
    folio.load = lambda _ruta: cargado

    generar = folio.generate
    crudo = {}

    def generate(*a, **k):
        crudo["texto"] = generar(*a, **k)
        return crudo["texto"]

    folio.generate = generate

    corridas = []
    for caso in casos:
        crudo.clear()
        inicio = time.perf_counter()
        error = None
        resultado = None
        try:
            resultado = folio.extract(caso["correo"])
        except Exception as e:  # el validador de Folio rechaza con ValueError
            error = f"{type(e).__name__}: {e}"
        segundos = round(time.perf_counter() - inicio, 2)
        esperado = caso["esperado"]
        if resultado is None:
            campos = {c: False for c in CAMPOS}
            arts = False
            inventados = []
        else:
            campos = {c: campo_ok(c, resultado[c], esperado[c]) for c in CAMPOS}
            arts = articulos_ok(resultado["articulos"], esperado["articulos"])
            inventados = [c for c in CAMPOS if invento(c, resultado[c], esperado[c])]
        corrida = {
            "id": caso["id"],
            "tipo": caso["tipo"],
            "correo": caso["correo"],
            "esperado": esperado,
            "resultado": resultado,
            "error": error,
            "campos": campos,
            "articulos_ok": arts,
            "inventados": inventados,
            "correcto": resultado is not None and arts and all(campos.values()),
            "segundos": segundos,
            "crudo": crudo.get("texto"),
        }
        corridas.append(corrida)
        print(f"{caso['id']:<26} {'ok ' if corrida['correcto'] else 'MAL'} {segundos:>6}s", flush=True)

    n = len(corridas)
    aciertos_campo = {
        c: sum(1 for r in corridas if r["campos"][c]) for c in CAMPOS
    }
    aciertos_campo["articulos"] = sum(1 for r in corridas if r["articulos_ok"])
    tiempos = sorted(r["segundos"] for r in corridas)
    salida = {
        "fecha": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "modelo": Path(folio.MODEL).name,
        "prompt": folio.SYSTEM,
        "archivo_casos": CASOS.name,
        "equipo": platform.machine(),
        "carga_segundos": round(carga_s, 2),
        "casos": n,
        "casos_correctos": sum(1 for r in corridas if r["correcto"]),
        "aciertos_por_campo": aciertos_campo,
        "campos_evaluados": n * 5,
        "campos_correctos": sum(aciertos_campo.values()),
        "casos_con_dato_inventado": sum(1 for r in corridas if r["inventados"]),
        "rechazados_por_validador": sum(1 for r in corridas if r["error"]),
        "segundos_mediana": tiempos[n // 2],
        "segundos_maximo": tiempos[-1],
        "corridas": corridas,
    }
    SALIDA.write_text(json.dumps(salida, ensure_ascii=False, indent=2))
    print(json.dumps({k: v for k, v in salida.items() if k != "corridas"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
