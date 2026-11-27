# Plan: de los bocetos al proyecto real con Astro

> Propuesta de Claude (27-11-2026), pendiente de aprobación de Mireia. **No se ha instalado nada.**
> Cada paso se hace por separado y se revisa antes de pasar al siguiente.

## Punto de partida

- Bocetos en `design-ejemplos/` (portada, 6 actividades, glosario, fuentes, ficha) con datos en `design-ejemplos/data/` e imágenes en `design-ejemplos/img/` y `public/images/`.
- En el ordenador ya hay **Node 24.22.1 y npm 11.19.1**. Solo faltaría Astro (paquete de npm).
- Los bocetos **no se borran**: quedan como referencia hasta que todo esté migrado y probado.

## Paso 0 — Crear el proyecto (☎️ necesita tu permiso)

- Instalar Astro en la raíz del repositorio (`npm create astro@latest` o `npm install astro`), sin plantillas de ejemplo ni librerías extra. Antes de instalar se comprueba la versión estable del momento.
- Se aprovecha la carpeta `public/` que ya existe (imágenes de las mujeres).
- Konva (pancarta) ya está descargado en `design-ejemplos/lib/`: se reutiliza tal cual, sin instalar nada más.
- Archivos privados fuera de git: añadir `docs/*privado*` al `.gitignore` (propuesta).

## Estructura

```
src/
  pages/[lang]/index.astro              → portada
  pages/[lang]/mujeres/[slug].astro     → una página por ficha (nuevo: hoy solo se abren dentro de la portada)
  pages/[lang]/actividades/*.astro      → frases, linea-del-tiempo, mapa, porcentajes, vinilos, pancarta
  pages/[lang]/glosario.astro
  pages/[lang]/fuentes.astro
  layouts/Base.astro                    → <head>, fuentes, cabecera, pie con encaje y firma, estela del puntero
  components/                           → Cabecera, Pie, Calendario, CartaMujer, BotonEfectos, IntroActividad…
  data/                                 → los JSON actuales (calendario, mujeres, glosario, actividades…)
  i18n/es.json, ca.json, en.json        → textos de interfaz («Ver ficha», «Quitar efectos», «Lema feminista»…)
  styles/                               → comun.css, ficha.css, encaje-pie.css
  scripts/                              → JS de cada actividad (vanilla, como ahora: se carga solo en su página)
```

- Sin framework de componentes (React, etc.): el JS actual es vanilla y funciona como «isla» dentro de cada página.
- Rutas por idioma: `/es/…`, `/ca/…`, `/en/…`, con el castellano por defecto.

## Idiomas (preparado para más de tres)

- Lista de idiomas en un solo sitio (configuración de Astro + `src/i18n/`). Añadir gallego (`gl`), valenciano (`ca-valencia`) o euskera (`eu`) será añadir un archivo de interfaz y los campos en los datos.
- Si a un texto le falta la traducción, se enseña el castellano (nunca un hueco), y en la vista interna se marca como pendiente.
- Selector de idioma en la cabecera (hoy los botones ES/CA/EN son de adorno).

## Orden de migración

1. **Base**: layout, cabecera, pie, estela, foco con brillo dorado, fuentes tipográficas. Portada completa (calendario con lemas, cartas, juego, actividades, glosario).
2. **Fichas** con página propia (`/es/mujeres/frida-kahlo`), manteniendo la apertura dentro de la portada.
3. **Glosario** y **fuentes**.
4. **Actividades**, una a una: frases → línea del tiempo → porcentajes → vinilos → mapa → pancarta (Konva y el mapa solo se cargan en su página).
5. **Textos de interfaz** a `src/i18n/` y **selector de idioma**.
6. **Sección nueva «Mujeres de hoy»** (ver `webFeminist.md`), cuando Mireia tenga los textos.

Después de cada paso: `npm run build` sin errores, prueba en escritorio y móvil (Playwright), revisión visual de Mireia 👀 y commit sugerido.

## Publicación (decisión pendiente, t28) — 🔗 necesita tu permiso

- Propuesta: **GitHub Pages** (gratis, estático, el portfolio de Mireia ya está ahí), con una acción de GitHub que construye la web al hacer merge en `main`.
- Alternativa: Netlify (también gratis para webs estáticas).
- Nombre y dominio: pendientes.

## Tareas relacionadas

t27 (Astro), t28 (hosting), t29 (textos de interfaz), t30 (WebP), t31 (fuentes locales), t32 (favicon), t33 (pruebas), t43 (más lenguas).
