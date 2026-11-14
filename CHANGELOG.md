# Registro de cambios

Cambios importantes del proyecto, de lo más reciente a lo más antiguo.

## 2026-11-14
- Boceto de la página pública de Fuentes (`design-ejemplos/fuentes-boceto.html`): reúne en una tabla con filtros el calendario, las fichas y las imágenes, con la primera columna «Dónde se usa». Con `?interno=1` muestra además el estado y las notas de trabajo. Preparada para sumar las actividades con `data/fuentes-actividades.json`.
- Calendario: 15 entradas nuevas en días vacíos (diciembre, febrero, marzo, abril y mayo), con premios y hitos como el Óscar de Hattie McDaniel (29 feb), la Constitución española de 1978 (6 dic), la píldora (9 may), el voto en Kuwait (16 may) y Amelia Earhart (20 may). Hay 251 entradas en 212 días.

## 2026-11-13
- Fichas de las mujeres: las 11 muestran ahora enlaces a sus fuentes (`design-ejemplos/data/fuentes-fichas.json`) en lugar de `[FUENTE PENDIENTE]`, sin cambiar los textos de Mireia; las que solo tienen fuentes divulgativas o de comunidades (Aglaonice y Julia Hermosilla) se marcan como provisionales. Tras una segunda búsqueda, Frida, Zheng Shi y Hedy Lamarr ganan fuentes institucionales (museos, patente, archivos y la obra de Neumann de 1831). Los avisos sobre los textos están en `referencias.md`.
- Calendario: tres entradas pasan a verificada con fuentes institucionales (Japón 1946, Camp Nou 2022 y Teresa Berganza); mejoradas las fuentes de otras cinco que siguen en parcial; nuevas anclas verificadas: Wyoming (10 dic 1869) y el desfile sufragista de Washington (3 mar 1913). Corregidos dos textos (Yu Gwan-sun fuera del 1 de marzo; Kamaladevi sin «cooperativas»).

## 2026-11-12
- Fotos con licencia libre (Lamarr, Margulis, Lovelace, Hipatia y Olimpia de Gouges) en el dorso de las tarjetas, con autor y licencia visibles; crédito completo con enlaces en la ficha. Datos en `design-ejemplos/data/fotos.json`.
- Imágenes del dorso completadas: ilustración moderna para Aglaonice y, para Zheng Shi y Julia Hermosilla, un texto honesto («sin retrato fiable» / «sin imagen con licencia libre»). Las 11 tarjetas tienen ya dorso resuelto.
- Pista para girar las cartas: la espiral gira despacio, al pasar el ratón sale «Girar» y una mano «toca» la espiral de la primera carta visible hasta que se gira una carta por primera vez (se recuerda en el navegador).
- La ficha abierta se centra en pantalla y, al cerrarla, la página vuelve a la altura de antes.
- Calendario: entradas de la segunda quincena de marzo y dos alternativas de premio; nuevo tipo `premio` limitado a premios relevantes.
- Objetos de las fichas: la pistola de Julia Hermosilla y el sable de Zheng Shi se sustituyen por una gorra militar y un catalejo.
- Nueva página provisional `design-ejemplos/revision-calendario.html` para repasar el calendario en tabla con filtros.
- `README.md` y este `CHANGELOG.md` creados. Corregida en `CLAUDE.md` la ruta de `webFeminist.md`.

## 2026-11-11
- Calendario: rellenados diciembre, enero, febrero, marzo y abril (227 entradas con día, 10 sin día exacto).
- Reglas del agente investigador: nuevo tipo `premio` y límite de nacimientos y muertes juntos; lecciones aprendidas.
- Portada D: calendario adaptado a anclas, entradas «sin día exacto», sensibles y parámetro `?fecha=`.
- Fichas de las mujeres abiertas en su sitio dentro del carrusel (estilo del juego), con objeto relacionado.
- Animación de la cabeza igual que en el juego (eje en el centro de la cabeza).
- Documentadas las anclas del calendario (`docs/anclas-feminismo.md`).

## 2026-11-10
- Inicio de las búsquedas del calendario y diseño casi acordado.

## 2026-11-09
- Primera versión de la web Feminist (maquetas de diseño).
