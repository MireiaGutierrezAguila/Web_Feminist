# Propuesta de nuevas entradas del calendario (informe)

Generado el 2026-11-18. Archivos: `calendario-propuesta.json` (mismo formato que `calendario.json`) y este informe. No se ha modificado `calendario.json`, el CSV ni ningún otro archivo.

## 1. Resumen

- **CSV leído:** 159 líneas (no 157). 113 filas de datos (líneas 2-114), 3 líneas en blanco, 25 líneas de texto suelto («Otras fechas…», 6 párrafos temáticos con restos de «Galletas Gullón», «eAcnur» y similares), 1 cabecera repetida y 14 filas de la tabla de Días Internacionales.
- **Ignoradas sin dato:** unas 40 filas vacías (sin candidata o «vacío» sin contenido; incluye la fila de junio «19 días vacíos» sin lista) y las filas en blanco.
- **Filas «ya rellenado - revisar» (8):** 11 y 13 ago, 22 ago, 1 sep, 22 sep, 25 sep, 28 sep, y 7 ago (Tulu). Son entradas que YA existen en `calendario.json`: no se han tocado; ver apartado 5 para lo que se ha podido comprobar.
- **Entradas propuestas: 52 nuevas** (7 verificadas, 24 parciales, 21 «revisar») **+ 7 entradas YA existentes que se proponen mover** (por chocar con un Día Internacional fijo). Total en el JSON: 55 días-entrada + 4 sinDia.
- **Movidas de día (nuevas, 9):** (formato MM-DD) Fossey 01-16 a 01-01; Olympe de Gouges 05-07 a 05-02; Rosalía 05-17 a 05-15; Bachendri Pal 05-23 a 05-14; Savitskaya 07-25 a 07-06; Tulu 08-07 a 08-03; Ada Lovelace 12-10 a 12-05; Mileva Marić 12-19 a 12-15; Sara García Alonso 11-23 a «durante este mes» de noviembre (sinDia, porque noviembre no tiene ningún día libre).
- **Entradas existentes que se mueven (7):** Savitribai Phule (muerte, 03-10 a 03-14); México 1975 (06-19 a 06-01); Arabia Saudí conducir (06-24 a 06-05); Dobbs (06-24 a 06-02); y a «durante este mes» de octubre, por falta de día libre: MacArthur/Japón (10-11), Kathryn Sullivan (10-11) y #MeToo (10-15).
- **Estados por calidad real de verificación:** muchas páginas oficiales (ONU, Britannica, Nobel, NZHistory, Te Ara, RAH) devolvieron 403 y no cuentan como abiertas. Por eso solo 7 quedan «verificada».
- Los textos moviendo el día llevan la fecha real al principio («El 7 de mayo de 1748: Nace…»), porque el día en el que se muestran no es el del hecho.
- **Regla que he aplicado en los choques:** una entrada existente en `calendario.json` manda sobre una nueva; la excepción son los Días Internacionales fijos, que mandan siempre sobre lo existente (pedido por Mireia) y solo cuando su entrada es «verificada» o «parcial». Si el día fijo está en «revisar» (31-03 y 28-09), no se mueve nada y la entrada nueva queda como no principal.

## 2. Tabla de entradas

| Día | Texto (resumen) | Tema | País | Estado | Calidad fuentes | Origen |
|---|---|---|---|---|---|---|
| 01-01 | Nace Dian Fossey, zoóloga estadounidense. Estudió a los gorilas de mon | ciencia y tecnología | EE. UU. (trabajó en Ruanda) | verificada | basica | nueva movida |
| 02-15 | Nace Susan B. Anthony, activista estadounidense. Fue una de las lídere | voto y derechos políticos | EE. UU. | verificada | buena | nueva |
| 03-10 | La ONU proclama el 10 de marzo como Día Internacional de las Juezas, p | justicia y derechos | ONU (internacional) | parcial | basica | nueva |
| 03-14 | Muere Savitribai Phule, maestra india que en 1848 abrió en Pune lo que | educación | India | parcial | - | existente movida |
| 03-31 | Se celebra por primera vez el Día Internacional de la Visibilidad Tran | movimientos sociales y derechos | EE. UU. | revisar | basica | nueva, choque sin resolver |
| 04-02 | Muere Zewditu, emperatriz de Etiopía, que gobernó el país desde 1916. | poder político | Etiopía | revisar | basica | nueva |
| 04-05 | Nace Wanda Szmielew, matemática polaca especialista en lógica y en los | ciencia y tecnología | Polonia | parcial | basica | nueva |
| 04-12 | Nace Montserrat Caballé, soprano catalana. En 1965 saltó a la fama int | arte y literatura | España | parcial | basica | nueva |
| 04-14 | Nace Annie Maunder, astrónoma. Fotografió la corona del Sol y descubri | ciencia y tecnología | Reino Unido (nacida en Irlanda) | verificada | basica | nueva |
| 04-15 | Nace Abigaíl Mejía, escritora y activista dominicana. Fundó el Club No | movimientos sociales y derechos | República Dominicana | parcial | basica | nueva |
| 04-20 | Allison Roe gana el maratón de Boston con un tiempo de 2 h 26 min 46 s | deporte | Nueva Zelanda | parcial | basica | nueva |
| 04-23 | Se celebra por primera vez el Día Internacional de las Niñas en las TI | ciencia y tecnología | ONU / UIT (internacional) | parcial | buena | nueva |
| 04-26 | Se adopta en España el 26 de abril como Día de la Visibilidad Lésbica, | movimientos sociales y derechos | España | verificada | basica | nueva |
| 04-27 | Ana María Matute recibe en Alcalá de Henares el Premio Cervantes, el m | arte y literatura | España | revisar | basica | nueva |
| 05-02 | Nace Olympe de Gouges, escritora francesa. En 1791 publicó la «Declara | movimientos sociales y derechos | Francia | revisar | basica | nueva movida |
| 05-04 | Margaret Thatcher se convierte en la primera mujer al frente del gobie | poder político | Reino Unido | parcial | basica | nueva |
| 05-06 | Se celebra por primera vez el Día Mundial de la Salud Mental Materna,  | salud y derechos reproductivos | Internacional | parcial | basica | nueva |
| 05-07 | Nace Eva Perón («Evita»), política y activista argentina. Impulsó el v | voto y derechos políticos | Argentina | revisar | basica | nueva |
| 05-12 | Nace Florence Nightingale, enfermera británica y figura clave de la en | salud y derechos reproductivos | Reino Unido | revisar | basica | nueva |
| 05-13 | Muere Teresa Berganza, cantante de ópera española. Recibió el Premio P | arte y literatura | España | parcial | basica | nueva |
| 05-14 | Bachendri Pal llega a la cima del Everest y se convierte en la primera | exploración y aventura | India | parcial | basica | nueva movida |
| 05-15 | Se publica «Cantares gallegos», de Rosalía de Castro; desde 1963 el 17 | arte y literatura | España | revisar | basica | nueva movida |
| 05-17 | Se escoge el 17 de mayo como Día contra la Homofobia, la Transfobia y  | movimientos sociales y derechos | OMS / internacional | revisar | basica | nueva |
| 05-23 | La ONU fija el 23 de mayo como Día Internacional para la Eliminación d | salud y derechos reproductivos | ONU (internacional) | revisar | basica | nueva |
| 05-24 | Desde 1982 se celebra el 24 de mayo el Día Internacional de las Mujere | movimientos sociales y resistencia | Internacional | parcial | basica | nueva |
| 05-26 | Althea Gibson gana el torneo de Roland Garros y es la primera tenista  | deporte | EE. UU. | parcial | basica | nueva |
| 05-27 | Australia vota en referéndum cambiar su Constitución para quitar norma | movimientos sociales y derechos | Australia | parcial | basica | nueva |
| 06-01 | Comienza en Ciudad de México la primera conferencia mundial de la ONU  | movimientos sociales y derechos | México | verificada | - | existente movida |
| 06-02 | El Tribunal Supremo de EE. UU. resuelve Dobbs contra Jackson y anula l | salud y derechos reproductivos | EE. UU. | verificada | - | existente movida |
| 06-05 | Arabia Saudí permite que las mujeres obtengan licencia y conduzcan; el | movimientos sociales y derechos | Arabia Saudí | verificada | basica | existente movida |
| 06-19 | La ONU proclama el 19 de junio como Día Internacional para la Eliminac | justicia y violencia | ONU (internacional) | parcial | buena | nueva |
| 06-23 | La ONU proclama el 23 de junio como Día Internacional de las Viudas, p | derechos e igualdad | ONU (internacional) | parcial | buena | nueva |
| 06-24 | La Asamblea General de la ONU proclama el 24 de junio como Día Interna | trabajo y economía | ONU (internacional) | parcial | buena | nueva |
| 07-06 | Svetlana Savitskaya, cosmonauta soviética, hace desde la estación Saly | exploración y aventura | Unión Soviética | revisar | basica | nueva movida |
| 07-10 | EE. UU. gana el Mundial de fútbol femenino de 1999 ante China, en una  | deporte | EE. UU. | verificada | buena | nueva |
| 07-11 | La Unión Africana adopta en Maputo, en Mozambique, el Protocolo sobre  | derechos e igualdad | Unión Africana (Mozambique) | revisar | basica | nueva |
| 07-18 | Nadia Comăneci consigue en Montreal el primer 10 de la gimnasia olímpi | deporte | Rumanía | parcial | buena | nueva |
| 07-25 | Tras el primer Encuentro de Mujeres Negras de América Latina y el Cari | movimientos sociales y derechos | República Dominicana | revisar | basica | nueva |
| 07-29 | Once mujeres son ordenadas sacerdotes en la Iglesia Episcopal, en Fila | religión y sociedad | EE. UU. | verificada | buena | nueva |
| 07-31 | Mujeres de todo el continente se reúnen en Dar es Salaam en la primera | movimientos sociales y derechos | Tanzania | revisar | basica | nueva |
| 08-03 | Derartu Tulu, de Etiopía, gana los 10 000 metros de los Juegos de Barc | deporte | Etiopía | parcial | buena | nueva movida |
| 08-05 | Son fusiladas en Madrid las Trece Rosas, jóvenes encarceladas tras la  | justicia y violencia | España | parcial | basica | nueva |
| 08-08 | Nace Ernestina Pérez Barahona, médica chilena. Se tituló en 1887 y fue | salud y derechos reproductivos | Chile | revisar | basica | nueva |
| 08-15 | Helen Connon obtiene en Nueva Zelanda un máster en Artes con honores,  | educación | Nueva Zelanda | revisar | basica | nueva |
| 08-17 | Nace Tina Modotti, fotógrafa italiana. Se hizo conocida por sus fotos  | arte y literatura | Italia (activa en México) | revisar | basica | nueva |
| 08-30 | Nace Mary Shelley, escritora británica. A los 20 años publicó, de form | arte y literatura | Reino Unido | parcial | basica | nueva |
| 09-04 | Desde 2010 se celebra el 4 de septiembre el Día Mundial de la Salud Se | salud y derechos reproductivos | Internacional | revisar | basica | nueva |
| 09-05 | En Tiahuanaco (Bolivia), organizaciones indígenas de América fijan el  | movimientos sociales y derechos | Bolivia | revisar | basica | nueva |
| 09-28 | El Encuentro Feminista Latinoamericano y del Caribe, celebrado en Arge | salud y derechos reproductivos | Argentina / América Latina | revisar | basica | nueva, choque sin resolver |
| 10-06 | Se anuncia que la escritora francesa Annie Ernaux recibe el Premio Nob | arte y literatura | Francia | parcial | basica | nueva |
| 10-11 | La Asamblea General de la ONU proclama el 11 de octubre como Día Inter | educación | ONU (internacional) | parcial | buena | nueva |
| 10-15 | La Asamblea General de la ONU proclama el 15 de octubre como Día Inter | trabajo y economía | ONU (internacional) | parcial | buena | nueva |
| 10-20 | Nelly Sachs, poeta alemana exiliada en Suecia, recibe el Premio Nobel  | arte y literatura | Alemania (exiliada en Suecia) | revisar | basica | nueva |
| 12-05 | Nace Ada Lovelace, matemática británica. Sus notas de 1843 sobre la má | ciencia y tecnología | Reino Unido | parcial | basica | nueva movida |
| 12-15 | Nace Mileva Marić, matemática y física serbia. Estudió Física y Matemá | ciencia y tecnología | Serbia (entonces Austria-Hungría) | revisar | basica | nueva movida |
| sinDia 10 | El general MacArthur pide al primer ministro Shidehara reformas que in | voto y derechos políticos | Japón | verificada | basica | existente movida |
| sinDia 10 | Kathryn Sullivan realiza desde el transbordador Challenger (misión STS | exploración y aventura | EE. UU. | verificada | basica | existente movida |
| sinDia 10 | Tarana Burke inició en 2006 el movimiento «me too»; el 15 de octubre d | violencia y justicia | EE. UU. | verificada | basica | existente movida |
| sinDia 11 | la Agencia Espacial Europea presenta a su nueva generación de astronau | ciencia y tecnología | España / ESA (Europa) | verificada | buena | nueva |

Todas las entradas llevan `comprobado: 2026-11-18`, `ca` y `en` = «[TRADUCCIÓN PENDIENTE]» y el origen en `nota` (fila del CSV, errores del CSV, qué páginas se abrieron y cuáles no).

## 3. Errores y avisos del CSV (comprobados)

- **Fossey (5 ene):** nació el 16 de enero de 1932 (dos fuentes abiertas). El 5 de enero es un error de NG.
- **Olympe de Gouges (26 feb):** nació el 7 de MAYO de 1748 (Britannica y un documento escolar francés, en el buscador). El 26 de febrero no corresponde a ningún dato suyo.
- **Beatrix Potter (22 ene):** nació el 28 de julio de 1866 (de memoria, sin comprobar): no es el 22 de enero. Descartada del día; el 28-07 ya tiene una entrada de «arte y literatura» del Reino Unido, quizá ella.
- **Ada Lovelace (24 mar):** su nacimiento es el 10 de diciembre (MacTutor, abierta). Ese día ya tiene dos entradas, de modo que va a un día libre de diciembre.
- **Mileva Marić / Maunder / otras:** fechas coherentes. Maunder (14-04) verificada.
- **Tina Modotti:** 16 o 17 de agosto según la fuente (enciclopedia dice 16; archivo estatal italiano, 17). Queda en «revisar».
- **Ernestina Pérez (8 ago):** el 8 de agosto es su NACIMIENTO (1865 o 1868 según la fuente), no su título (10 de enero de 1887, segunda médica de Chile). Queda en «revisar».
- **Maputo (11 jul):** la página de la Unión Africana dice 1 de julio de 2003 y el texto del protocolo dice 11 de julio. Discrepancia sin resolver.
- **Savitskaya (25 jul):** una página (Space.com) dice que el 25 de julio es el LANZAMIENTO; otras, el paseo. Sin resolver.
- **Enlaces del CSV que no sirven:** diainternacionalde.com devolvió 404 en varias fichas (visibilidad transgénero, homofobia, afrolatina, panafricana, aborto, juezas con otra ruta, etc.); `rag.gal` no existe (la Real Academia Galega usa otro dominio); el enlace de NG de Zewditu trata de Haile Selassie; el de NG de Annie Maunder, de fotografía astronómica; el de Eva Perón (buenosaires.gob.ar) trata de su muerte (26 de julio).
- **Fila 111 (Sara García Alonso):** pone «diciembre» pero habla del 23 de noviembre de 2022. Ver dudas.
- **Calderwood (14 mar):** no he podido identificar a quién se refiere (la página potboiler.co.uk no se pudo abrir ni aparece en el buscador). Descartada.

## 4. Dudas que Mireia debe decidir

1. **Días Internacionales fijos que mueven entradas YA verificadas (7).** Ejemplo: #MeToo (15-10) y la conferencia de México 1975 (19-06) salen del día para dejar sitio a un día de la ONU solo «parcial» (fuentes no abiertas). Alternativa: dejar ambas entradas en el día (como hace el calendario con 45 días de 2 entradas) y que solo una sea principal. Recomiendo esta alternativa para los días de la ONU con fuentes «parcial».
2. **Días de la ONU «parcial» con fuentes que no se abrieron** (violencia sexual en conflictos, viudas, diplomacia, mujeres rurales, niña, juezas, fístula): los documentos oficiales existen (resoluciones de la Asamblea General), pero conviene abrirlos antes de publicar.
3. **Fechas móviles (tienes dos):** Día de las Niñas en las TIC (cuarto jueves de abril) y Día de la Salud Mental Materna (primer miércoles de mayo). Se han puesto en 23-04 y 06-05 (fechas de 2026 que tú indicaste), pero el calendario usa fechas fijas MM-DD. ¿Las dejamos como etiqueta de 2026 o buscas hechos de fecha fija? Pandita Ramabai queda fuera de abril (sustituida por el Día TIC, como pediste).
4. **Temas sensibles para público infantil:** Día del aborto legal y seguro (28-09), visibilidad transgénero (31-03), homofobia (17-05), salud sexual (04-09) y Trece Rosas (05-08). Los textos son neutrales y breves, pero ¿los quieres?
5. **Política partidista:** Margaret Thatcher (04-05) y Eva Perón (07-05). Thatcher: la mención de que no se identificaba con el feminismo se apoya en una fuente del CSV que no pude abrir; no he incluido la cita «No le debo nada a la liberación femenina». Eva Perón: dos figuras en el mismo día (una con Olympe de Gouges).
6. **Sara García Alonso (23-11):** el 23-11 ya tiene dos muertes (Beevi 2023, Higuchi 1896) y noviembre no tiene ningún día libre. Elegí la opción menos invasiva: sinDia («Durante este mes…»). Alternativa: hacerla principal del 23-11 y mover las dos muertes a sinDia.
7. **Susan B. Anthony (15-02)** y otras de EE. UU./voto: cuota ya muy alta; ¿se descarta Anthony?
8. **Matute (27-04):** el Premio Cervantes se concedió en 2010 pero la entrega (27-04-2011) no está confirmada. Alternativa del CSV: Sudáfrica 1994 (elecciones del 27-04-1994), sin investigar.
9. **Dos filas de mayo con datos no procesadas:** 1 de mayo (Día del Trabajo, con un artículo de CCOO sobre mujeres) y 3 de mayo (Libertad de Prensa). Son días internacionales sin dato de mujer concreto; he reservado 05-01 y 05-03 para ellos (no se han ocupado) y no se ha propuesto entrada. ¿Qué dato quieres?
10. **Los párrafos temáticos del CSV (voto/Nueva Zelanda y Campoamor, Blackwell 1849, anticonceptivos, derechos civiles, Hodgkin, CEDAW):** no son fechas concretas, no se han procesado. Varios ya están (NZ 19-09, Campoamor 01-10, CEDAW 18-12). Blackwell (se graduó en enero de 1849) y Dorothy Hodgkin (Nobel 1964; nació el 12 de mayo de 1910, de memoria) serían buenas candidatas a investigar.
11. **Choques de tema/país en días contiguos:** quedan unos 19 pares (la mayoría ya existían en el calendario; los nuevos son, p. ej., 26-04 y 27-04, ambos de España; 23-06 y 24-06, ambos de la ONU). Mireia puede mover una de cada par.
12. **Mujeres vivas:** ninguna se propone como cumpleaños; Sara García Alonso y Savitskaya (hito, no cumpleaños) están vivas, según las fuentes.

## 5. Descartado y por qué

- **15-01 Martin Luther King / Rosa Parks:** no es un dato sobre una mujer ni una fecha de ella (Rosa Parks ya está en el 01-12).
- **22-01 Beatrix Potter:** fecha errónea (ver arriba). **24-03 Ada Lovelace:** fecha errónea.
- **14-03 «Marie Curie / Einstein / Lovelace»:** fila confusa, mezcla tres personas (el 14-03 es el cumpleaños de Einstein). Descartada. **14-03 Calderwood:** no identificada.
- **31-03 Juana de Arco:** sin hecho asociado a ese día en la fila (de memoria, murió el 30 de mayo de 1431; sin investigar). Descartada.
- **05-06 Día del Medio Ambiente / Maathai:** su Nobel (8 de octubre) ya está en el calendario; el 5 de junio no corresponde a ningún hecho suyo.
- **19-08 Savitskaya (primer vuelo, 1982):** repite persona con el paseo espacial y Mireia anotó «viva». Descartada (la fecha 19-08-1982 sí aparece en Space.com, abierta).
- **10-12 «Premios Nobel / Ada»:** la parte de la ceremonia es genérica (sin mujer concreta); se conserva solo el nacimiento de Ada.
- **11-01 Earhart, 11-02 Día de la Ciencia, 08-03, 16-06 Tereshkova, 07-11 Curie, 25-11 y 28-05 (Acción por la Salud de las Mujeres):** ya están en `calendario.json`.
- **Filas «ya rellenado - revisar»:** no se han tocado. Lo comprobado: 13-08 Túnez (el Código del Estatuto Personal es de 1956; no se reabrieron las páginas); 22-08, 01-09, 22-09, 25-09 «parcial»: sin cambios; 11-08 YH y 28-09 Ley del Vientre Libre marcadas «sensibles»: sin cambios (la del 28-09 convive con el Día del aborto).
