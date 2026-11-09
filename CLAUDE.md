# CLAUDE.md — Web Feminist (Mujeres de la Historia)

> Las normas comunes (seguridad, forma de trabajar, símbolos) ya están en ~/.claude/CLAUDE.md:
> no se repiten aquí. **Léelo siempre al empezar la sesión y aplícalo junto con este archivo**
> (en especial los símbolos en los mensajes). Si no existe o no puedes leerlo, avísame
> antes de seguir.
> @~/.claude/CLAUDE.md
>
> Al empezar la sesión, lee en modo solo lectura los settings del proyecto
> (`.claude/settings.json` y `.claude/settings.local.json`) y los generales
> (`~/.claude/settings.json`). No muestres ni copies valores secretos (claves, tokens,
> variables de entorno) y avísame si algo choca con estas normas.
>
> El contexto completo del proyecto (objetivos, secciones, actividades, contenido) está en
> `docs/webFeminist.md`. Léelo antes de empezar cualquier sección o actividad nueva:
> @docs/webFeminist.md

## Sobre el proyecto
- **Qué es:** web educativa sobre feminismo y mujeres de la historia que continúa el videojuego móvil *Feminist*, con fichas de mujeres, actividades interactivas y enlace al juego en Google Play.
- **Objetivo actual:** definir la estructura de la web y montar la base (portada, carrusel de fichas e idiomas) antes de empezar las actividades.
- **Público / plataforma:** web responsive, diseñada primero para móvil (táctil) y también para escritorio. Público amplio: niñas y niños, jóvenes y adultos.
- **Estado:** idea / inicio del desarrollo.

## Tecnologías
- **Lenguaje(s):** HTML, CSS, JavaScript/TypeScript.
- **Framework:** Astro (web estática con "islas" interactivas para las actividades). [POR CONFIRMAR]
- **Librerías previstas por actividad:**
  - Arrastrar tarjetas (línea de tiempo, cuestionario, memory): SortableJS o dnd-kit. Deben funcionar con el dedo.
  - Globo terráqueo: globe.gl.
  - Pancarta 8M: Konva.js o Fabric.js.
  - Antes de añadir cualquier otra librería, pregúntame.
- **Herramientas conectadas:** GitHub, Canva, Confluence (notas del proyecto).
- **Hosting:** [POR DECIDIR — Netlify, Vercel o GitHub Pages]
- **Versiones importantes:** Node LTS. [RELLENAR cuando se cree el proyecto]

## Estructura de carpetas (propuesta)
```
/src/pages/[lang]/     → páginas en es / ca / en
/src/components/       → componentes comunes (cabecera, pie, ficha, carrusel…)
/src/activities/       → una carpeta por actividad (timeline/, memory/, mapa/, pancarta/…)
/src/content/mujeres/  → fichas de mujeres (texto de Mireia, uno por idioma)
/src/content/glosario/ → términos del glosario
/src/data/             → datos de actividades (timeline.json, mapa.json, preguntas…)
/src/i18n/             → textos de interfaz por idioma
/public/images/mujeres/<slug>/ → dibujo, animación y foto real de cada mujer
/docs/                 → documentación (webFeminist.md)
```
- **Archivos/carpetas que NO se tocan:** `.env`, `/dist`, archivos generados.
- **Textos de las fichas (`/src/content/mujeres/`):** son de Mireia. NO cambies ni corrijas sus palabras. Si ves una errata o un dato dudoso, avísame y no lo modifiques.

## Comandos habituales
| Para qué | Comando |
|---|---|
| Arrancar en local | `npm run dev` |
| Ejecutar pruebas | [POR DECIDIR — propuesta: Playwright con emulación de móvil] |
| Generar la versión final (build) | `npm run build` |
| Ver la build en local | `npm run preview` |

## Convenciones de código
- Nombres de variables y funciones: en inglés, camelCase. Componentes en PascalCase.
- Nombres de archivos de contenido: slug en minúsculas sin acentos (`hipatia-de-alejandria`).
- Comentarios: en español, explicando el *por qué*, no solo el *qué*.
- Formato: indentación de 2 espacios, Prettier.
- Preferir código sencillo y legible antes que "ingenioso".
- **El contenido va en archivos de datos, nunca escrito dentro del código.** Cada actividad lee sus datos de `/src/data/` o `/src/content/`.
- Ningún texto visible escrito directamente en un componente: todo pasa por los archivos de idioma.

## Normas específicas de esta web
- **Móvil primero:** todo debe funcionar con el dedo en pantallas pequeñas. El drag & drop nativo de HTML no sirve en táctil: usar la librería elegida.
- **Fuentes obligatorias:** todo dato, fecha, cifra o cita debe llevar su fuente visible. Nunca inventes datos, fechas, citas ni referencias. Si no encuentras una fuente fiable, déjalo marcado como `[FUENTE PENDIENTE]` y avísame.
- **Fotos reales:** solo imágenes con licencia que permita usarlas (dominio público o Creative Commons), guardando el autor y la licencia para mostrarlos.
- **Sin servidor ni cuentas:** no se recogen datos personales. El progreso (insignias) se guarda en el navegador (`localStorage`, siempre dentro de try/catch).
- **Idiomas:** castellano, catalán e inglés. Las traducciones que hagas tú se marcan como pendientes de revisión de Mireia.
- **Accesibilidad:** textos alternativos en imágenes, contraste suficiente, se puede usar con teclado y se respeta `prefers-reduced-motion` en las animaciones.
- **Rendimiento:** imágenes optimizadas (WebP/AVIF) y carga diferida. El globo y la pancarta se cargan solo al abrir su actividad.
- **Pie de página:** en todas las páginas debe aparecer que la web está diseñada, programada y probada por Mireia Gutiérrez.

## Verificación (antes de marcar ✅)
- Comprobar que el código se ejecuta y la build se genera sin errores.
- Si hay pruebas, ejecutarlas y decirme el resultado.
- Comprobar en tamaño móvil (vertical y horizontal) y en escritorio.
- Si es algo visual, avisarme con 👀 para que lo revise yo.
- Decirme qué has comprobado y qué no has podido comprobar (por ejemplo, en un móvil real).

## Git (lo gestiona Mireia)
- Al terminar una sección, sugiere:
  - qué archivos incluir en el commit,
  - un mensaje de commit corto y claro en español.
- Rama principal: `main`.

## Documentación y registro de cambios
- Mantener actualizado `README.md` cuando cambie cómo se instala o se usa el proyecto (avisando con 🔶).
- Si se toma una decisión nueva sobre secciones o actividades, propón actualizar `docs/webFeminist.md` (avisando con 🔶).
- Anotar los cambios importantes en `CHANGELOG.md`.

## Notas y decisiones del proyecto
<!-- Aquí se van apuntando decisiones importantes para no repetirlas en cada sesión -->
- El mural colaborativo está descartado: requiere moderación y Mireia no quiere revisarlo.
- La web no tiene backend: es estática.
- Las fichas de mujeres las escribe Mireia (ya hay 11) y su texto no se modifica.
