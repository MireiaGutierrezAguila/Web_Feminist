# Web Feminist — Documento del proyecto

> Documento de producto de la web. Recoge objetivos, secciones, actividades y decisiones.
> Origen: página de Confluence "Documentación web Mujeres de la Historia" (espacio IC).
> Cuando cambie algo importante, se actualiza aquí.

---

## 1. Objetivos

1. **Dar continuidad al videojuego *Feminist*** (juego móvil hecho en Unreal Engine, publicado en itch.io y próximamente en Google Play). El juego enlazará a esta web y la web servirá también para dar a conocer el juego.
2. **Concienciar sobre la importancia del feminismo**, llegando al máximo de personas: mujeres y hombres, jóvenes, niñas y niños. Que conozcan su historia y reflexionen sobre ella.
3. **Educar.** Mireia fue maestra durante más de 15 años y le apasiona educar. La web debe tener un enfoque didáctico, adaptado a distintas edades.
4. **Ser un ejemplo de que las mujeres podemos ser lo que queramos.** Debe quedar claro que toda la web la ha hecho una mujer, en un sector (la informática) donde las mujeres son una clara minoría. Mireia pasó de la educación a la informática, un trabajo que en su momento ni se había planteado.
5. **Ser una web fiable.** Todo, absolutamente todo, debe tener referencias visibles de dónde sale la información.

## 2. Público
- Muy amplio: niñas y niños, adolescentes y adultos.
- Uso desde móvil (prioritario) y desde ordenador.
- Puede usarse en colegios e institutos.
- Como hay menores, no se recogen datos personales.

## 3. Especificaciones generales
- **Responsive**, pensada primero para móvil y uso táctil.
- **Idiomas:** castellano, catalán e inglés.
- **Sin cuentas ni servidor.** El progreso se guarda en el navegador.
- **Fuentes visibles en todo el contenido.** Forma de mostrarlas: [POR DECIDIR — p. ej. botón "Fuentes" en cada ficha y actividad, y una página general de fuentes].
- **Firma** en el pie de todas las páginas: "Diseñada, programada y probada por Mireia Gutiérrez".

---

## 4. Entrada a la web
- La primera vez que se entra, el logo aparece dibujándose, se ilumina y después se muestra la portada con alguna animación original.
- En las visitas siguientes se puede saltar o acortar la intro. [POR DECIDIR]

## 5. Secciones

### 5.1 Portada
- Presentación y explicación de la web.
- **Una mujer cada día:** una mujer que nació o hizo algo importante un día como hoy. Da motivos para volver.

### 5.2 Mujeres de la historia (fichas en carrusel)
- Carrusel de tarjetas.
- Cada tarjeta muestra el **dibujo de la mujer moviendo la cabeza, como en el juego**. Al tocarla, la tarjeta **gira y muestra la foto de la mujer real**.
- **El texto de las fichas lo escribe Mireia** (ya hay 11 y habrá más). **No se cambian sus palabras.**
- Mujeres que ya aparecen en el juego, entre otras: Ada Lovelace, Rosa Parks, Frida Kahlo, Hedy Lamarr, Emma Goldman e Hipatia de Alejandría.
- Formato de animación del dibujo: [POR DECIDIR — vídeo WebM con transparencia, sprite sheet o animación por partes].

**Estructura de una ficha** (datos de cada mujer):
| Campo | Ejemplo |
|---|---|
| Nombre completo | Hipatia de Alejandría |
| Nombre corto | Hipatia |
| Fechas | 355/370 - 415 |
| Profesión | Astrónoma, matemática y filósofa |
| Lugar | Alejandría (Egipto) |
| Logro | Texto breve |
| ¿Quién fue? | Texto largo |
| Fuentes | Lista de referencias |
| Imágenes | Dibujo, animación y foto real (con autor y licencia) |

**Ejemplo de ficha (texto de Mireia):**

> # Hipatia de Alejandría
> **Hipatia** (355/370 - 415)
>
> Astrónoma, matemática y filosofa - Alejandría (Egipto)
>
> LOGRO:
>
> Mejoró y construyó instrumentos astronómicos como el astrolabio o el planisferio.
>
> ### ¿Quién fue ?
> Hipatia de Alejandría fue una brillante filósofa, matemática y astrónoma griega que vivió en Egipto a finales del siglo IV y principios del V. Es la primera mujer matemática de la que se conserva un registro biográfico e histórico detallado, además destacó por sus profundos conocimientos en geometría, álgebra y astronomía. Su figura se convirtió en un símbolo universal de la razón, el libre pensamiento y la erudición. Su trágica muerte, a manos de una multitud de cristianos extremistas que atacaban la ciencia y el paganismo clásico, la consagró definitivamente como un icono histórico de la defensa del conocimiento y la libertad intelectual. Para algunos historiadores su muerte supuso el principio del fin del paganismo en la Antigüedad.

### 5.3 El juego Feminist
- Explicación detallada de cómo se juega.
- Enlace a Google Play.
- Enlace al portfolio de Mireia, que tiene una explicación más general.

### 5.4 Actividades interactivas
- [POR DECIDIR] Sección propia o actividades visibles directamente en la portada.
- **Insignias:** cada actividad completada da un sello, guardado en el navegador sin cuentas. Mantiene el espíritu de juego.
- Agrupadas en dos bloques: **Descubrir** y **Reflexionar** (ver apartado 6).

### 5.5 Glosario feminista ilustrado
- Términos como sororidad, techo de cristal, brecha salarial o micromachismo, en tarjetas sencillas.

### 5.6 Hecha por una mujer en la informática
- **"Quién ha hecho esto":** la historia de Mireia, de maestra a informática, contada en primera persona.
- **"Cómo se hizo":** el making of de la web y del juego (Unreal, código, agentes de IA y pruebas). Enseña que detrás de la tecnología también hay mujeres.
- **Mujeres que programaron el mundo:** Ada Lovelace, Grace Hopper, las programadoras del ENIAC, Margaret Hamilton (Apolo 11), Katherine Johnson…

### 5.7 Fuentes de información
- Página que reúne todas las referencias, además de las que se muestran en cada ficha y actividad.

---

## 6. Actividades

### Descubrir
| Actividad | Descripción | Herramienta prevista |
|---|---|---|
| **Memory** | Juego de parejas o de relación: dibujo del personaje + nombre + foto de la mujer real. | JS / componente propio |
| **Línea del tiempo** | Colocar tarjetas con años y hechos concretos (voto de la mujer en España, divorcio, lo mismo en otros países…). La línea ya incluye eventos guía (Revolución Francesa, guerras mundiales, grandes hitos históricos). Es larga y no cabe en pantalla: se desplaza de lado a lado. | SortableJS o dnd-kit + scroll horizontal |
| **La mujer en el mundo** | Globo terráqueo que se puede girar y que colorea los países según la opción elegida: ha tenido una mujer presidenta, la mujer puede votar, la mujer puede conducir, matrimonio infantil… Idea: deslizador de años para ver la evolución. | globe.gl + GeoJSON de países |
| **¿De quién es la frase?** | Una cita y 2 o 3 tarjetas de mujeres (dibujo, nombre y mayor logro). Hay que arrastrar la tarjeta al hueco de respuesta y ver si se acierta. Ejemplo: "El feminismo es la idea radical de que las mujeres son personas" (se suele atribuir a Cheris Kramarae, pero es de Marie Shear, 1986 — verificar con fuente). | Misma librería de arrastre |
| **Pancarta 8M** | Diseñar tu propia pancarta con frases a elegir, dibujos, colores… y descargarla como imagen. | Konva.js o Fabric.js |
| **Inventos de mujeres** | "¿Quién inventó…?": el limpiaparabrisas (Mary Anderson), el lavavajillas (Josephine Cochrane), el kevlar (Stephanie Kwolek), la base del wifi y el bluetooth (Hedy Lamarr). | JS / componente propio |
| **¿Quién se llevó el mérito?** (efecto Matilda) | Descubrimientos de mujeres que se atribuyeron a hombres: Rosalind Franklin, Lise Meitner, Jocelyn Bell… | JS / componente propio |

### Reflexionar
| Actividad | Descripción |
|---|---|
| **¿Machismo o no?** | Situaciones cotidianas para clasificar, con una explicación después de cada una. Por niveles de edad. |
| **¿Y si fuera al revés?** | Situaciones con los roles invertidos, para que se note lo que normalmente pasa desapercibido. |
| **La brecha en cifras** | Datos interactivos: reparto de tareas domésticas, brecha salarial convertida en "desde qué día del año las mujeres trabajan gratis"… |
| **Las calles de tu ciudad** | Qué porcentaje de calles lleva nombre de mujer. Enlazar o inspirarse en los mapas del proyecto Geochicas. |
| **Crea la ficha de una mujer importante de tu vida** | Tu madre, tu abuela, tu profesora… con el mismo formato que las fichas del juego. Se descarga como imagen y no se publica en la web, así que no necesita moderación. |

### Ideas para más adelante
- **"¿Qué quieres ser?":** para niñas y niños, mujeres reales en profesiones donde hay pocas (programadora, piloto, ingeniera, bombera…).
- **Sección para docentes y familias:** guías didácticas por edad, actividades imprimibles y propuestas para el 8M, el 25N o el 11F.
- **Itinerarios por edad:** recorridos recomendados según la edad de quien visita la web.

### Descartado
- **Mural colaborativo de frases:** descartado porque requiere moderación continua. Alternativa posible sin moderación: elegir entre frases predefinidas y mostrar cuántas personas apoyan cada una.

---

## 7. Decisiones pendientes
- [ ] Nombre definitivo y dominio de la web.
- [ ] Framework (propuesta: Astro) y hosting.
- [ ] Actividades en sección propia o en la portada.
- [ ] Formato de la animación de la cabeza de cada mujer.
- [ ] Cómo se muestran las fuentes (diseño).
- [ ] Quién hace las traducciones al catalán y al inglés y cómo se revisan.
- [ ] Fuentes de datos para el globo terráqueo y la brecha en cifras.
- [ ] Orden de desarrollo de las actividades.
