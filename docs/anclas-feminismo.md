# Sistema de «anclas» del calendario: hitos imprescindibles + relleno por meses

> Idea de Mireia (2026-11-11). Estado: **plan pendiente de su aprobación**; todavía no se ha creado ninguna ancla ni se ha lanzado ningún agente.

## Idea
1. Primero se hace una **búsqueda general de los hitos más relevantes del feminismo** y se colocan en su día del año. Esos hitos («anclas») **tienen que estar sí o sí**.
2. Después, **los agentes rellenan los huecos mes a mes** (con las cuotas de variedad), sabiendo ya qué anclas hay.
3. Si un hito **no tiene fecha concreta**, se le da sitio igualmente con un texto tipo «durante este mes se inicia…».

## Cómo funcionaría (propuesta técnica, pendiente de aprobar)
- **Campo nuevo `ancla: true`** en `design-ejemplos/data/calendario.json`. En su día, el calendario muestra la ancla antes que cualquier otra entrada. Lo que ya existe ese día pasa a «alternativa».
- **Campo `precision`:** `"dia"` (por defecto), `"mes"` o `"anio"`. Las entradas de precisión `"mes"` **no se asignan a un día inventado**: se mostrarían en una línea aparte («Este mes: …»). Está por decidir si se enseña siempre o solo en días sin entrada.
- Mismos campos que el resto: `tipo`, `anio`, `pais`, `tema`, `region`, `texto` (es/ca/en), dos `fuentes` abiertas, `estado`, `comprobado`, `calidadFuentes`, `nota`.
- Cada ancla se **verifica con dos fuentes abiertas** (al menos una institucional). Las listas de abajo y la web son **pistas, no fuentes**.
- Tamaño previsto: unas **80–120 anclas** en todo el año. Mireia revisa la lista y decide cuáles entran.
- **Equilibrio:** las anclas también cuentan para las cuotas de variedad (voto ≤20 %, EE. UU./Europa occ. ≤25 %, ≥30 % fuera de Europa y Norteamérica, España ≥3 días/mes…). Hay que **añadir anclas de América Latina, África, Asia y Oceanía**, porque las listas de partida son casi todo sufragismo occidental.
- **Orden de trabajo:** (a) lista de anclas en este documento → (b) revisión de Mireia → (c) pasarlas al JSON → (d) agentes mes a mes (quedan 11 meses: enero a octubre y diciembre; noviembre ya está completo, y las anclas que coincidan pasan a principal con lo actual como alternativa).

## Pistas de partida (SIN VERIFICAR)

### Web indicada por Mireia
https://generoymetodologias.org/actualidad/detalle/movimientos-feministas-que-cambiaron-el-mundo/ — «Movimientos feministas que cambiaron el mundo». Mireia cree que sus hitos deberían estar. **Pendiente de leer** (no se ha abierto aún).

### Resultado de una búsqueda rápida con IA (pegado por Mireia; tal cual, hay que contrastarlo todo)
**Primera ola: orígenes ilustrados y sufragismo (siglos XVIII a principios del XX)**
- 1791: Declaración de los Derechos de la Mujer y de la Ciudadana (Olympe de Gouges).
- 1792: *Vindicación de los derechos de la mujer* (Mary Wollstonecraft).
- 1848: Convención de Seneca Falls (Lucretia Mott y Elizabeth Cady Stanton; Declaración de Sentimientos).
- 1893: Nueva Zelanda, primer país con sufragio femenino.
- 1903: Fundación de la WSPU (Emmeline Pankhurst, Reino Unido).
- 1920 y 1931: voto femenino en EE. UU. (19.ª Enmienda) y en España (Cortes, con Clara Campoamor).

**Segunda ola: igualdad real, derechos laborales y reproductivos (años 40 a 80)**
- 1949: *El segundo sexo* (Simone de Beauvoir).
- 1963: Ley de Igualdad Salarial en EE. UU.
- 1973: Roe contra Wade.
- 1975: Huelga de mujeres en Islandia (se dice que participó el 90 %).
- 1979: Aprobación de la CEDAW por la Asamblea General de la ONU.

**Tercera y cuarta ola: interseccionalidad y movilización global (años 90 a hoy)**
- 1989: término «interseccionalidad» (Kimberlé Crenshaw).
- 1995: Cuarta Conferencia Mundial sobre la Mujer en Pekín (se dice que 189 países).
- 2015: movimiento #NiUnaMenos (Argentina, tras el feminicidio de Chiara Páez).
- 2017: viralización de #MeToo.
- 2018: huelgas feministas del 8M (seguimiento histórico en España).

## Cautelas y cosas a comprobar (de memoria de quien redactó, NO verificadas)
- **Roe contra Wade (1973):** parece que ya no está vigente (se anuló en 2022). Si se incluye, con ese matiz, o buscar otro hito de derechos reproductivos más estable.
- **#MeToo:** la expresión parece haberla creado Tarana Burke años antes de 2017; la lista de la IA no la nombra.
- **Declaración de Olympe de Gouges (1791) y *El segundo sexo* (1949):** probablemente sin día exacto o con fechas discutidas → candidatas a precisión `"mes"`.
- **Cifras como «90 %» (Islandia) o «189 países» (Pekín):** comprobar con fuente oficial antes de usarlas.
- La lista de la IA es casi toda **voto, EE. UU. y Europa**: ampliar con el resto del mundo.
- Aplican las reglas de redacción de siempre: tono informativo, sin detalles gráficos, nombrar a las personas por su nombre, sin «primera» sin fuente.

## Decisiones pendientes de Mireia
1. Aprobar este plan (empezar por leer la web indicada y montar la lista de anclas).
2. Cómo mostrar las entradas de precisión `"mes"`: línea «Este mes: …» siempre, o solo en días vacíos.
3. **Permiso de lectura web para los agentes:** en `~/.claude/settings.json` (global) está `WebFetch` dentro de `permissions.ask`, así que **cada página** que abre un agente pide confirmación (esa regla gana a los permisos de «permitir» del proyecto). Opciones: quitar `WebFetch` de `ask` (automático, en todos los proyectos) o aprobar a mano y lanzar un solo agente cada vez. Sin decidir.
4. Diciembre: se lanzaron tres agentes (días 1–10, 11–21, 22–31) y se pararon al empezar, sin resultados. Hay que relanzarlos (con las anclas ya colocadas, si se aprueba el plan).
