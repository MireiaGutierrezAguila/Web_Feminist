# Referencias de la web Feminist

Documento con el origen de cada contenido de la web. Una sección por sitio.
Regla del proyecto: nada se inventa; si falta la fuente se marca `[FUENTE PENDIENTE]`.

---

## Calendario (portada)

- **Qué se muestra:** la fecha de hoy (la da el reloj del navegador) y una efeméride de ese día (hito del feminismo, derecho conseguido, o nacimiento/muerte de una mujer). Sin línea de fuente dentro del calendario (decisión de Mireia, 2026-11-09); la fuente de cada día se muestra en la página de referencias de la web y se guarda en los datos.
- **Decisión (2026-11-10):** el calendario se hace con datos propios y verificados, **no** con el texto de un calendario ajeno. Así Mireia no depende de licencias de terceros si en el futuro la web lleva publicidad u otros ingresos.
- **Cómo se construye:** por orden de prioridad (1) hechos históricos del feminismo, (2) derechos conseguidos (voto, aborto, baja por menstruación…), (3) nacimientos o muertes de mujeres. Prioridad geográfica: mundo, España y 5–6 países más (3 con más avance y 3 con más retraso según un índice público con su año). Dos fuentes con enlace por entrada. Reglas completas en `.claude/agents/investigador-efemerides.md`.
- **Sistema de «anclas» (2026-11-11):** primero se fijan en su día los grandes hitos del feminismo (`ancla: true`), cada uno con dos fuentes abiertas verificadas por un agente; después se rellenan los huecos mes a mes. Los hitos sin día exacto van en una sección aparte (`sinDia`) y solo se enseñan en días sin efeméride («Este mes: …» o «Sin día exacto, …»). Plan y decisiones en `docs/anclas-feminismo.md`.
- **Estado (2026-11-11):**
  - **Noviembre completo:** los 30 días tienen entrada (casi todas verificadas con dos fuentes abiertas).
  - **Resto del año:** solo hay las anclas ya verificadas (56 con día y 8 sin día), repartidas de forma irregular; muchos días del año aún están sin entrada y se rellenarán por meses con el agente.
  - **En el JSON hay 97 entradas en 82 días** (95 verificadas, 1 parcial, 1 «revisar») y 8 entradas en `sinDia` (2 verificadas y 6 parciales). 21 entradas llevan `calidadFuentes: "basica"` (dos páginas abiertas pero sin fuente institucional, o una sola fuente institucional): hay que repasarlas antes de publicar.
  - **Entradas «sensibles»** (de momento una, Mahsa Amini): no se muestran en la portada salvo que Mireia lo decida (`?sensibles=1` en la maqueta).
  - **Pendiente:** verificar las anclas que faltan, rellenar el resto de meses, completar las traducciones (ca y en están como `[TRADUCCIÓN PENDIENTE]`) y revisar a mano las fuentes dudosas.
  - **Cómo se enseña en la portada:** solo entradas `verificada` (las `sinDia` también si son `parcial`), con el año en negrita y sin fuente visible; la fuente se muestra en la página de referencias de la web. En la maqueta se puede probar otro día con `?fecha=AAAA-MM-DD`.
- **Datos en el proyecto:** `design-ejemplos/data/calendario.json`. Reglas de redacción, cuotas de variedad y fuentes prohibidas en `.claude/agents/investigador-efemerides.md`. Borrador y comprobaciones de noviembre en `docs/efemerides-noviembre-borrador.md`.
- **Documento consultado y descartado como fuente:** *2026 Mujeres activistas. Tiempo de mujeres, mujeres en el tiempo*, calendario de 2026 editado por STES Intersindical y Confederación Intersindical, Organización de Mujeres (ilustraciones: Laura Romero Pereira; diseño y maquetación: Mónica Muñoz Montejano; depósito legal M-20026-2025). Licencia indicada en la contraportada: Creative Commons **BY-NC-ND**. No se copia ningún texto suyo y el archivo se eliminó del proyecto el 2026-11-10. Se anota aquí solo por transparencia y por si algún día se cita como lectura recomendada. Origen del archivo: https://share.google/AvBbwGna5qks7uaQD

---

## Fichas de las mujeres (11)

- **Textos:** escritos por Mireia Gutiérrez (no se modifican).
- **Origen de los datos de cada ficha** (fechas, cifras, hechos): `[FUENTE PENDIENTE]` en las 11 fichas.
- **Dónde están:** página de Confluence del proyecto y `design-ejemplos/data/mujeres.json`.

| Mujer | Fuente de sus datos |
|---|---|
| Ada Lovelace | [FUENTE PENDIENTE] |
| Aglaonice de Tesalia | [FUENTE PENDIENTE] |
| Emma Goldman | [FUENTE PENDIENTE] |
| Frida Kahlo | [FUENTE PENDIENTE] |
| Hedy Lamarr | [FUENTE PENDIENTE] |
| Hipatia de Alejandría | [FUENTE PENDIENTE] |
| Julia Hermosilla | [FUENTE PENDIENTE] |
| Lynn Margulis | [FUENTE PENDIENTE] |
| Olimpia de Gouges | [FUENTE PENDIENTE] |
| Rosa Parks | [FUENTE PENDIENTE] |
| Zheng Shi | [FUENTE PENDIENTE] |

---

## Imágenes

- **Dibujos de las mujeres:** de Mireia (autoría propia), en `public/images/mujeres/<slug>/`.
- **Capturas y marco del juego:** del juego *Feminist*, de Mireia.
- **Objetos relacionados con cada mujer:** ilustraciones de Mireia (autoría propia), en `public/images/mujeres/<slug>/objeto.png`; datos y textos alternativos en `design-ejemplos/data/objetos.json` (textos alternativos de redacción propia, pendientes de revisión de Mireia).
- **Material del juego usado en las fichas** (marcos, carteles, pergamino, botón de cerrar, adornos): del juego *Feminist*, de Mireia, en `public/images/juego/`.
- **Fotos reales (futuras):** solo con licencia que lo permita (dominio público, CC0, CC BY o CC BY-SA), con autor y licencia visibles en la web. Las capturas que Mireia reunió (`material-juego/fotos-mujeres-hitoria/`, carpeta fuera de Git) **no se publican**: se usan solo como referencia visual.

### Candidatas de fotos con licencia libre (búsqueda del 2026-11-11, `[PENDIENTE de visto bueno de Mireia]`)

> Búsqueda hecha por un agente en Wikimedia Commons. **Las fichas las leyó un modelo resumidor: antes de publicar hay que abrir a mano la página de cada imagen y confirmar autor y licencia.** Las etiquetas «PD-Art» y «PD-old» pueden tener restricciones en algunos países (por ejemplo, México, 100 años). Ninguna imagen se ha descargado al proyecto. Todos los enlaces son de `commons.wikimedia.org/wiki/File:…`.

| Mujer | Candidata recomendada | Autor y licencia | Píxeles | Pegas |
|---|---|---|---|---|
| Hedy Lamarr | [Hedy_Lamarr,_1939.jpg](https://commons.wikimedia.org/wiki/File:Hedy_Lamarr,_1939.jpg) | Los Angeles Times (colección de UCLA). CC BY 4.0: https://creativecommons.org/licenses/by/4.0 | 4203×5392 | Exige crédito. Metadatos con una incoherencia (CC BY-SA en datos estructurados): confirmar el crédito en el registro de UCLA |
| Lynn Margulis | [Lynn_Margulis_2005.jpg](https://commons.wikimedia.org/wiki/File:Lynn_Margulis_2005.jpg) | Javier Pedreira (Flickr «wicho»), 2005. CC BY 2.0: https://creativecommons.org/licenses/by/2.0 | 2336×3504 | Exige atribución |
| Emma Goldman | [Emma_Goldman_LCCN2014710080.jpg](https://commons.wikimedia.org/wiki/File:Emma_Goldman_LCCN2014710080.jpg) | Bain News Service (Library of Congress), 1919. Dominio público (anterior a 1931) | 4197×5741 | Fotógrafo no identificado |
| Ada Lovelace | [Ada_Lovelace.jpg](https://commons.wikimedia.org/wiki/File:Ada_Lovelace.jpg) | Margaret Sarah Carpenter (1793-1872), óleo de 1836. Dominio público | 3604×5718 | Imagen retocada de color. No es una foto |
| Hipatia | [Hypatia_by_Julius_Kronberg,_1889.jpg](https://commons.wikimedia.org/wiki/File:Hypatia_by_Julius_Kronberg,_1889.jpg) | Julius Kronberg (1850-1921), óleo de 1889. Dominio público | 2237×3487 | Pintura imaginaria, no un retrato real |
| Olimpia de Gouges | [Marie-Olympe-de-Gouges.jpg](https://commons.wikimedia.org/wiki/File:Marie-Olympe-de-Gouges.jpg) | Alexander Kucharski (1741-1819), pastel del s. XVIII. Dominio público | 364×447 | Baja resolución. La versión mayor (`Olympe_de_Gouges.png`, 816×1090) lleva además una CC BY-SA 4.0 de la reproducción, que podría no ser obligatoria |
| Frida Kahlo | [Frida_Kahlo_by_Magda_Pach.jpg](https://commons.wikimedia.org/wiki/File:Frida_Kahlo_by_Magda_Pach.jpg) | Magda Pach (1884-1950), 1933. PD-Art / PD-old-70 y Public Domain Mark: https://creativecommons.org/publicdomain/mark/1.0/ | 981×1215 | En México (100 años) podría seguir protegida. La ficha no confirma si el original es óleo o foto |
| Rosa Parks | [Rosa_Parks,_November_1956.tif](https://commons.wikimedia.org/wiki/File:Rosa_Parks,_November_1956.tif) | Autor desconocido (Library of Congress), nov. 1956. Dominio público por falta de renovación del copyright | 2910×4188 | Razón de dominio público que conviene revisar caso por caso; en Canadá, Alemania, México o Suiza podría seguir protegida |
| Zheng Shi | **Sin candidata fiable** | — | — | Solo grabados de procedencia mal documentada (`鄭一嫂.jpg`, 1836; `ChingShihN01.png`), marcados DUDOSA. Una candidata no se pudo abrir |
| Aglaonice | **Sin candidata fiable** | — | — | `Aglaonice2.png` (CC BY-SA 4.0, usuario Alzinous): no se pudo ver qué representa |
| Julia Hermosilla | **Sin candidata fiable** | — | — | [Julia_Hermosilla.jpg](https://commons.wikimedia.org/wiki/File:Julia_Hermosilla.jpg) (h. 1930) con justificación débil (PD-Spain-photo y PD-1996), autor desconocido: DUDOSA |

**Alternativas por mujer** (si la recomendada no gusta):
- **Hedy Lamarr:** [foto de MGM, 1944](https://commons.wikimedia.org/wiki/File:Hedy_Lamarr_in_The_Heavenly_Body_1944.jpg) (PD-US-no notice, 2252×2787; fuente en un sitio de memorabilia).
- **Emma Goldman:** [h. 1915-1916](https://commons.wikimedia.org/wiki/File:Emma_Goldman_circa_1915-1916.jpg) (Bain, Library of Congress, 700×1024).
- **Ada Lovelace:** [daguerrotipo de Antoine Claudet](https://commons.wikimedia.org/wiki/File:Ada_Byron_daguerreotype_by_Antoine_Claudet_1843_or_1850.jpg) (740×1018, dominio público; **identificación de la retratada dudosa**) y [acuarela atribuida a Chalon](https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg) (2439×3504; autoría dudosa).
- **Hipatia:** [Charles Mitchell, 1885](https://commons.wikimedia.org/wiki/File:Hypatia_(Charles_Mitchell).jpg) (1982×3186; revisar visualmente la escena) y [Alfred Seifert](https://commons.wikimedia.org/wiki/File:Alfred_Seifert_Hypatia.jpg) (2286×2984).
- **Olimpia de Gouges:** [acuarela del Louvre, 1793](https://commons.wikimedia.org/wiki/File:Olympe_de_Gouges.jpg) (1000×1343, autor desconocido).
- **Lynn Margulis:** [Lynn_Margulis-2.jpg](https://commons.wikimedia.org/wiki/File:Lynn_Margulis-2.jpg) (CC BY-SA 2.5, retoque sepia, 597×853; obliga a compartir igual).
- **Rosa Parks:** [1955, con E. D. Nixon](https://commons.wikimedia.org/wiki/File:Rosa_Parks_1955_2.jpg) (Associated Press, 2526×2600) y [1986](https://commons.wikimedia.org/wiki/File:Rosa_Parks_and_Enolia_McMillan_1986.jpg) (Baltimore Sun, 640×928, calidad baja). Misma advertencia sobre otros países.
- **Frida Kahlo:** las fotos de Guillermo Kahlo (1919, 1932) y la de Carl Van Vechten (1932) quedan descartadas por ser DUDOSAS.

**Estado al 2026-11-12 (verificación con las fichas y la API de Commons; las fuentes originales UCLA, Louvre, Library of Congress y otras no se pudieron abrir):**
- **Colocadas** en `public/images/mujeres/<slug>/foto-real.jpg` (1200 px, JPEG): Hedy Lamarr (CC BY 4.0), Lynn Margulis (CC BY 2.0), Ada Lovelace (óleo, dominio público), Hipatia (óleo imaginado, dominio público) y Olimpia de Gouges (**acuarela del Louvre, 1793**, en lugar del pastel de Kucharski por su baja resolución). Créditos y notas en `design-ejemplos/data/fotos.json`.
- **Colocadas también (segunda búsqueda, 2026-11-12):** Rosa Parks (foto de la Casa Blanca, 1996, obra del gobierno federal de EE. UU.; recortada; en lugar del TIFF de 1956), Frida Kahlo (Toni Frissell, 1937, cedida por la autora al dominio público; recortada; en lugar de la «foto de Magda Pach», que era la fotografía de un cuadro y en México podría seguir protegida hasta 2050) y Emma Goldman (Bain News Service, 1919, recortada a cara y hombros; se descartó el retrato de Kajiwara de 1911 porque su autor murió en 1960 y podría seguir protegido en España y la UE hasta 2030). Créditos y notas en `design-ejemplos/data/fotos.json`. Pendiente: abrir a mano las páginas de loc.gov (Goldman: `/pictures/item/2014710080/`; Frida: ds.05050) para leer «Rights Advisory»; no se pudieron abrir (403).
- **Aglaonice (cerrada):** ilustración moderna `Aglaonice2.png` de Alzinous (2015, CC BY-SA 4.0), reducida a 800 px y mostrada como «Ilustración moderna», no como retrato histórico (no existe ningún retrato antiguo). Se descartó el dibujo del vaso griego de Tischbein (1791): muestra dos figuras desnudas con armas, poco adecuado para el público, y su lectura como «bajar la luna» es una hipótesis académica de 1973. CC BY-SA obliga a citar autor y licencia y a compartir las derivadas con la misma licencia.
- **Zheng Shi y Julia Hermosilla (sin imagen):** el dorso de su tarjeta muestra un texto honesto en lugar de una foto («No se conserva ningún retrato fiable de ella» / «No hay una imagen suya con licencia libre»), en `fotos.json` (`sinImagen`; textos de redacción propia, pendientes de revisión de Mireia). Para Zheng Shi, el único grabado encontrado era de 450 px y sin procedencia clara; seguir buscando exigiría abrir las copias digitalizadas del libro de Neumann (1831) en HathiTrust o archive.org. La única foto de Julia (h. 1930, autor desconocido) tiene una licencia débil.

**Cuando se publique una foto:** copiarla a `public/images/mujeres/<slug>/foto-real.jpg` (optimizada) y anotar aquí su URL, autor, licencia y fecha de comprobación. Los créditos de las licencias CC BY y CC BY-SA deben verse en la web junto a la foto.

---

## Letras (tipografías)

Todas se cargan hoy desde Google Fonts. Licencia de cada una: `[REVISAR antes de publicar]` (comprobar en la ficha de Google Fonts de cada familia).

| Letra | Dónde se usa |
|---|---|
| Cinzel Decorative | Títulos y nombres de la web (cartel del nombre en las fichas, cintas de sección) |
| Cinzel | Número del día en el calendario y fechas/subtítulos de las fichas (versión sin adorno, más legible) |
| Atkinson Hyperlegible Next | Textos de lectura (texto de las fichas, calendario, botones) |
| Almendra Display | Se carga en la portada D; uso decorativo (revisar si sigue haciendo falta) |
| Quintessential | Frase del logro sobre el pergamino de la ficha (elegida por Mireia, 2026-11-11) |

- **Probadas y descartadas para el pergamino:** Handlee y Send Flowers (solo se cargan en `design-ejemplos/ficha-boceto.html`, el boceto).
- **Nota técnica:** cargar las letras desde Google Fonts envía la dirección IP de cada visitante a un servidor externo. Si el proyecto quiere no recoger ningún dato personal, convendrá alojarlas en el propio sitio antes de publicar.
