# Web Feminist — Mujeres de la Historia

Web educativa sobre feminismo y mujeres de la historia que continúa el videojuego móvil *Feminist* (Unreal Engine). Pensada primero para móvil, en castellano, catalán e inglés, con las fuentes visibles y sin servidor.

> Diseñada, programada y probada por Mireia Gutiérrez.

**Estado:** diseño y maquetas (HTML/CSS/JS sin framework). El proyecto real con Astro todavía no está creado.

## Qué hay ahora

| Carpeta o archivo | Qué contiene |
|---|---|
| `design-ejemplos/propuesta-d-mezcla.html` | La portada elegida: carrusel de mujeres con fichas que se abren en su sitio y calendario de efemérides |
| `design-ejemplos/ficha-boceto.html` | Boceto de la ficha de una mujer con el estilo del juego |
| `design-ejemplos/revision-calendario.html` | Página provisional para repasar el calendario en tabla (con filtros) |
| `design-ejemplos/data/` | Datos: `mujeres.json`, `objetos.json`, `calendario.json` |
| `design-ejemplos/css/`, `design-ejemplos/js/` | Estilos y código compartidos de las maquetas |
| `public/images/` | Dibujos de las mujeres (`mujeres/<slug>/`) y recursos del juego (`juego/`) |
| `docs/` | Documentación del calendario (anclas, borradores) |
| `webFeminist.md` | Documento de producto: objetivos, secciones y actividades |
| `referencias.md` | Fuentes, fuentes tipográficas y candidatas de fotos con licencia |
| `.claude/agents/` | Agente que investiga efemérides (solo lee la web) |

`material-juego/` (referencias del juego) no se sube al repositorio.

## Cómo ver las maquetas

Las páginas leen archivos JSON, así que hay que abrirlas desde un servidor local, no con doble clic:

```bash
python3 -m http.server 8766 --bind 127.0.0.1
```

Luego abre `http://127.0.0.1:8766/design-ejemplos/propuesta-d-mezcla.html`.

Parámetros útiles en la portada (solo para probar):
- `?fecha=2026-04-09` enseña el calendario de ese día.
- `?sensibles=1` incluye las entradas marcadas como sensibles.

## Calendario de efemérides

- Los datos están en `design-ejemplos/data/calendario.json`: una entrada principal por día y alternativas, más entradas «sin día exacto».
- Cada entrada lleva tipo, año, país, tema, región, texto, fuentes con enlace y estado (`verificada`, `parcial` o `revisar`). La portada solo muestra las verificadas.
- Los textos en catalán e inglés están marcados `[TRADUCCIÓN PENDIENTE]`.
- Los hitos clave («anclas») se fijan en su día; ver `docs/anclas-feminismo.md`.

## Reglas importantes

- Todo dato, fecha, cifra o cita lleva su fuente visible. Sin fuente fiable: `[FUENTE PENDIENTE]`.
- Los textos de las fichas son de Mireia y no se modifican.
- Las fotos reales solo con licencia que lo permita (dominio público o Creative Commons).
- Sin cuentas ni datos personales; el progreso irá en el navegador.

Más detalle en `CLAUDE.md` y en `webFeminist.md`.
