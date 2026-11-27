/* Portada: calendario, nombres escondidos, carrusel, vídeo y lluvia de código.
   Necesita js/comun.js, js/ficha.js y js/estela.js cargados antes. */
F.iniciar();
var hero = document.getElementById('hero');
F.luz(hero, hero);
// Los remolinos suben un poco al hacer scroll (parallax suave, solo con efectos)
window.addEventListener('scroll', function () {
  if (F.efectosOn()) hero.style.setProperty('--sy', window.scrollY);
}, { passive: true });
F.codigo(document.getElementById('lluvia'), 18);

/* ================= Dibujos en espiral generados con código (SVG) ================= */
var NS = 'http://www.w3.org/2000/svg';
var raiz = document.documentElement.style;
function uri(svg) { return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")'; }
function doc(w, h, vb, contenido) { return "<svg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "' viewBox='" + vb + "'>" + contenido + '</svg>'; }

// Espiral regular que va de un radio R0 a otro R1 (hacia dentro o hacia fuera); dir 1 = sentido horario
function trazo(cx, cy, R0, R1, vueltas, dir, ang0) {
  var total = vueltas * 2 * Math.PI, n = Math.ceil(total / 0.12), pts = [];
  for (var k = 0; k <= n; k++) {
    var f = k / n, a = ang0 + dir * f * total, r = R0 + (R1 - R0) * f;
    pts.push((cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1));
  }
  return 'M' + pts.join(' L');
}
// Espiral irregular, "dibujada a mano": el radio y el ángulo tiemblan un poco
function irregular(vueltas, escala, semilla) {
  var pts = [];
  for (var t = 0; t <= vueltas * 2 * Math.PI; t += 0.12) {
    var r = escala * t * (1 + 0.11 * Math.sin(t * 1.3 + semilla) + 0.07 * Math.sin(t * 3.1 + 2 * semilla));
    var a = t + 0.06 * Math.sin(t * 2.2 + semilla);
    pts.push((r * Math.cos(a)).toFixed(1) + ' ' + (r * Math.sin(a)).toFixed(1));
  }
  return 'M' + pts.join(' L');
}
// Espirales grandes de fondo de la portada (tres, una a la izquierda)
function fondo(id, vueltas, escala, semilla) {
  var p = document.createElementNS(NS, 'path');
  p.setAttribute('d', irregular(vueltas, escala, semilla));
  p.setAttribute('fill', 'none'); p.setAttribute('stroke', '#F5F5F0');
  p.setAttribute('stroke-width', '15'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
  document.getElementById(id).appendChild(p);
}
fondo('esp1', 11, 4.4, 1.7);
fondo('esp2', 8, 6.2, 4.1);
fondo('esp3', 9, 5.2, 2.9);
fondo('esp4', 7, 6.6, 5.3);

// Calendario: la fecha sale del reloj del navegador; la efeméride, de data/calendario.json (clave "MM-DD")
(function () {
  var datos = null, lemas = null;
  var mayus = function (t) { return t.charAt(0).toUpperCase() + t.slice(1); };
  var dos = function (n) { return ('0' + n).slice(-2); };
  var diaDelAnio = function (d) { return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000); };
  /* Solo para la maqueta: ?fecha=2026-03-08 enseña ese día; ?sensibles=1 incluye las entradas marcadas como sensibles */
  var params = new URLSearchParams(location.search);
  var verSensibles = params.get('sensibles') === '1';
  function fechaInicial() {
    var f = params.get('fecha');
    if (f && /^\d{4}-\d{2}-\d{2}$/.test(f)) {
      var p = f.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]);
      if (!isNaN(d.getTime()) && d.getMonth() === +p[1] - 1) { return d; }
    }
    return new Date();
  }
  function pintar(hoy) {
    document.getElementById('calNum').textContent = hoy.getDate();
    document.getElementById('calSemana').textContent = mayus(hoy.toLocaleDateString('es-ES', { weekday: 'long' }));
    document.getElementById('calMes').textContent = mayus(hoy.toLocaleDateString('es-ES', { month: 'long' }));
    document.getElementById('calAnio').textContent = hoy.getFullYear();
    document.getElementById('calFecha').setAttribute('datetime', hoy.getFullYear() + '-' + dos(hoy.getMonth() + 1) + '-' + dos(hoy.getDate()));
    var ul = document.getElementById('calFrases');
    ul.textContent = '';
    if (!datos) { return; }
    var lista = datos.dias[dos(hoy.getMonth() + 1) + '-' + dos(hoy.getDate())] || [];
    /* Solo se enseñan entradas verificadas y no «sensibles» (salvo que se pida con ?sensibles=1).
       Prioridad: la principal, luego una ancla, luego el resto. La fuente no se muestra aquí: está en los datos */
    var visibles = lista.filter(function (e) { return e.estado === 'verificada' && (!e.sensible || verSensibles); });
    var elegida = visibles.filter(function (e) { return e.principal; })[0] || visibles.filter(function (e) { return e.ancla; })[0] || visibles[0];
    var li = F.el('li');
    if (elegida) {
      /* El año va en negrita (se crea con textContent, sin HTML, por seguridad) */
      var anio = F.el('strong');
      anio.textContent = elegida.anio + ':';
      li.appendChild(anio);
      li.appendChild(document.createTextNode(' ' + elegida.texto.es));
    } else if (lemas && lemas.length) {
      /* Día sin efeméride verificada (decisión de Mireia, 27-11-2026): se enseña un lema reivindicativo de las pancartas
         (data/pancarta-frases.json). Sale siempre el mismo para el mismo día del año. No es un dato: no lleva fuente */
      var lema = lemas[diaDelAnio(hoy) % lemas.length];
      li.className = 'cal-lema';
      var q = F.el('q'); q.textContent = lema.texto.es || lema.texto[lema.idioma];
      li.appendChild(q);
      var et = F.el('span', 'cal-lema-etiqueta'); et.textContent = 'Lema feminista';   /* texto de interfaz: irá en el archivo de idiomas */
      li.appendChild(et);
    } else {
      /* Texto de interfaz (no es un dato): irá en el archivo de idiomas */
      li.className = 'cal-vacio';
      li.appendChild(document.createTextNode('Hoy no tenemos efeméride. ¡Vuelve mañana!'));
    }
    ul.appendChild(li);
  }
  window.pintarCalendario = pintar; /* solo para probar otras fechas en la maqueta */
  pintar(fechaInicial());
  Promise.all([
    fetch('/data/calendario.json').then(function (r) { return r.json(); }),
    fetch('/data/pancarta-frases.json').then(function (r) { return r.json(); }).catch(function () { return null; })
  ]).then(function (res) {
    datos = res[0];
    lemas = res[1] && res[1].frases ? res[1].frases.filter(function (f) { return f.texto && (f.texto.es || f.texto[f.idioma]); }) : null;
    pintar(fechaInicial());
  }).catch(function () { /* sin datos: el calendario enseña solo la fecha */ });
})();

// Disco de espiral cerrada (montaje de Mireia): cuerpo oscuro, cinta clara en espiral y borde de cuerda retorcida
function disco(cuerpo, cinta, cuerdaA, cuerdaB) {
  var rim = '', N = 40, paso = 2 * Math.PI / N, torsion = 0.16;
  for (var k = 0; k < N; k++) {
    var a = k * paso;
    var p = [
      [41 * Math.cos(a), 41 * Math.sin(a)],
      [50 * Math.cos(a + torsion), 50 * Math.sin(a + torsion)],
      [50 * Math.cos(a + paso + torsion), 50 * Math.sin(a + paso + torsion)],
      [41 * Math.cos(a + paso), 41 * Math.sin(a + paso)]
    ];
    rim += "<path d='M" + p.map(function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' L') + "Z' fill='" + (k % 2 ? cuerdaA : cuerdaB) + "'/>";
  }
  var espiral = trazo(0, 0, 35, 4, 2.5, 1, 0);
  var contenido = "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='" + cinta + "'/><stop offset='1' stop-color='#8d8b86'/></linearGradient></defs>" +
    "<circle r='50' fill='" + cuerpo + "'/>" + rim + "<circle r='41' fill='" + cuerpo + "'/>" +
    "<path d='" + espiral + "' fill='none' stroke='#0d0a10' stroke-opacity='.55' stroke-width='9.5' stroke-linecap='round' stroke-linejoin='round'/>" +
    "<path d='" + espiral + "' fill='none' stroke='url(#g)' stroke-width='6.5' stroke-linecap='round' stroke-linejoin='round'/>" +
    "<circle r='3' fill='#0d0a10'/>";
  return uri(doc(100, 100, '-50 -50 100 100', contenido));
}
// Dos filas de discos que se deslizan: grandes detrás (ciruela) y pequeños delante (azul noche), con colores apagados.
// Cada fila tiene el doble de discos de los necesarios: al desplazarla la mitad, el bucle no se nota.
function remolinos() {
  var cont = document.getElementById('remolinos');
  var ancho = Math.min(Math.max(window.innerWidth, window.screen.width || 0, 1200), 2600);
  [
    { d: 112, b: 34, cuerpo: '#2b1a33', cinta: '#d9d6cf', a: '#bcb8b0', b2: '#3a2742', t: 190, sentido: 'normal' },
    { d: 66, b: 6, cuerpo: '#1b2447', cinta: '#d2d6db', a: '#aeb4bf', b2: '#26336a', t: 110, sentido: 'reverse' }
  ].forEach(function (f, k) {
    var fila = F.el('div', 'fila');
    fila.style.setProperty('--d', f.d + 'px');
    fila.style.setProperty('--b', f.b + 'px');
    fila.style.setProperty('--img', disco(f.cuerpo, f.cinta, f.a, f.b2));
    fila.style.setProperty('--t', f.t + 's');
    fila.style.setProperty('--sentido', f.sentido);
    var pista = F.el('div', 'pista-discos');
    var n = Math.ceil(ancho / (f.d * 0.94)) + 1;
    for (var i = 0; i < n * 2; i++) {
      var d = F.el('span', 'disco'), giro = F.el('i');
      giro.style.animationDelay = -((i * 3.7 + k * 5) % 24) + 's'; // cada disco gira desfasado
      d.appendChild(giro); pista.appendChild(d);
    }
    fila.appendChild(pista); cont.appendChild(fila);
  });
}
remolinos();

// Remolino de rayas desiguales para la colina de las cartas (blanco y negro, como el túnel hipnótico)
raiz.setProperty('--remolino', uri(doc(400, 400, '-200 -200 400 400',
  "<rect x='-200' y='-200' width='400' height='400' fill='#F5F5F0'/><path d='" + irregular(7, 4.6, 3.3) + "' fill='none' stroke='#101010' stroke-width='17' stroke-linecap='round' stroke-linejoin='round'/>")));

// Iconos de actividades: espirales de colores (en lugar de círculos concéntricos)
['#F27AA6', '#4FD0DB', '#FFA95C', '#C39BEE', '#7FD79E'].forEach(function (c, i) {
  raiz.setProperty('--ico-' + (i + 1), uri(doc(34, 34, '-17 -17 34 34',
    "<circle r='16.4' fill='#101010'/><path d='" + trazo(0, 0, 12.5, 1.6, 2.3, 1, 0) + "' fill='none' stroke='" + c + "' stroke-width='3.2' stroke-linecap='round'/>")));
});
// Espiral blanca para las cartas
raiz.setProperty('--esp-blanca', uri(doc(40, 40, '-20 -20 40 40',
  "<path d='" + trazo(0, 0, 17, 2, 2.4, 1, 0) + "' fill='none' stroke='#F5F5F0' stroke-width='3' stroke-linecap='round'/>")));

var COLORES_TARJETA = ['#C2386Eb3', '#127C86b3', '#E8762Bb3', '#8a4fc2b3', '#2E7D4Fb3'];
var COLORES_NOMBRE = ['#F27AA6', '#4FD0DB', '#FFA95C', '#C39BEE', '#7FD79E', '#F5F5F0'];

F.cargar().then(function () { return F.cargarObjetos(); }).then(function () { return F.cargarFotos(); }).then(function () { return F.cargarFuentes(); }).then(function () {
  var tarjetas = {}; // slug -> tarjeta de la fila, para abrir su ficha desde los nombres escondidos
  // Nombres escondidos en la oscuridad: cada uno lleva a su ficha
  var nombres = document.getElementById('nombres');
  // Cinco zonas (las rectángulos rosas de Mireia): 3 + 2 + 2 + 2 + 2 nombres. En pantallas estrechas las zonas "desaparecen" (display: contents)
  var reparto = [3, 2, 2, 2, 2], zonas = [], alineaciones = ['flex-start', 'center', 'flex-end'];
  var INCLINACIONES = [-8, 5, -4, 9, -7, 4, -10, 7, -3, 6, -9];
  reparto.forEach(function (_, z) { var d = F.el('div', 'zona z' + (z + 1)); nombres.appendChild(d); zonas.push(d); });
  var z = 0, dentro = 0;
  F.mujeres.forEach(function (m, n) {
    var a = F.el('a', '', m.nombre);
    a.href = '#mujeres';
    a.style.setProperty('--c', COLORES_NOMBRE[n % COLORES_NOMBRE.length]);
    a.style.setProperty('--g', INCLINACIONES[n % INCLINACIONES.length] + 'deg');   // cada nombre torcido de forma distinta (hasta ±10°), también sin efectos
    a.style.setProperty('--al', alineaciones[(n * 2 + z) % 3]); // cada nombre en un punto distinto de su zona
    a.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('mujeres').scrollIntoView({ behavior: F.reduce ? 'auto' : 'smooth' });
      F.abrirFicha(tarjetas[m.slug], m); // la ficha se abre en su sitio, dentro de la fila
    });
    zonas[Math.min(z, zonas.length - 1)].appendChild(a);
    if (++dentro >= reparto[z]) { z++; dentro = 0; }
  });
  // Pantalla ancha (1500 px o más): cada nombre se coloca al azar (siempre igual, semilla fija) en un hueco libre, sin tapar el título, el párrafo, el cartel,
  // el calendario, la cabecera ni la franja de espirales, y sin pisarse entre sí. En pantallas más estrechas los nombres van en una columna (CSS).
  function repartirNombres() {
    var ancha = window.matchMedia('(min-width: 1500px)').matches, enlaces = Array.prototype.slice.call(nombres.querySelectorAll('a'));
    if (!ancha) { nombres.classList.remove('colocados'); enlaces.forEach(function (a) { a.style.left = ''; a.style.top = ''; }); return; }
    var H = hero.getBoundingClientRect(), W = H.width, alto = H.height, semilla = 20261125;
    function azar() { semilla = (semilla + 0x6D2B79F5) | 0; var t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
    var obstaculos = [{ x: 0, y: 0, w: W, h: 92 }, { x: 0, y: alto - 176, w: W, h: 176 }];   // cabecera arriba y franja de espirales abajo
    ['.hero-texto > h1', '.hero-texto > p', '.poste-img', '.calendario'].forEach(function (q) {
      var e = hero.querySelector(q); if (!e) { return; } var r = e.getBoundingClientRect();
      obstaculos.push({ x: r.left - H.left - 16, y: r.top - H.top - 16, w: r.width + 32, h: r.height + 32 });
    });
    function choca(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
    var puestos = [];
    enlaces.slice().sort(function (p, q) { return q.offsetWidth - p.offsetWidth; }).forEach(function (a) {
      var w = a.offsetWidth, h = a.offsetHeight, mejor = null, i, c, k, ok;
      for (i = 0; i < 400 && !mejor; i++) {
        c = { x: 16 + azar() * (W - w - 32), y: 92 + azar() * (alto - 176 - 92 - h), w: w, h: h }; ok = true;
        for (k = 0; k < obstaculos.length && ok; k++) { if (choca(c, obstaculos[k])) { ok = false; } }
        for (k = 0; k < puestos.length && ok; k++) { if (choca(c, { x: puestos[k].x - 14, y: puestos[k].y - 10, w: puestos[k].w + 28, h: puestos[k].h + 20 })) { ok = false; } }
        if (ok) { mejor = c; }
      }
      if (!mejor) { mejor = { x: W - w - 24, y: 100 + puestos.length * 8, w: w, h: h }; }   // sin hueco (pantalla rarísima): a la derecha
      puestos.push(mejor); a.style.left = Math.round(mejor.x) + 'px'; a.style.top = Math.round(mejor.y) + 'px';
    });
    nombres.classList.add('colocados');
  }
  repartirNombres();
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(repartirNombres); }
  var temporizador; window.addEventListener('resize', function () { clearTimeout(temporizador); temporizador = setTimeout(repartirNombres, 150); });
  // La luz empieza sobre los nombres, para que se vea qué hace antes de mover el ratón
  var r = nombres.getBoundingClientRect(), h = hero.getBoundingClientRect();
  hero.style.setProperty('--lx', (r.left - h.left + r.width / 2) + 'px');
  hero.style.setProperty('--ly', (r.top - h.top + Math.min(r.height / 2, 160)) + 'px');

  var car = document.getElementById('carrusel');
  F.mujeres.forEach(function (m, n) {
    var tarjeta = F.tarjeta(m, n, {
      alVerFicha: function (mm, li) { F.abrirFicha(li, mm); },
      frente: function (cara, m, fig, n) {
        cara.classList.add('tarot');
        cara.style.setProperty('--v', COLORES_TARJETA[n % COLORES_TARJETA.length]);
        var arco = F.el('span', 'arco');
        arco.appendChild(F.el('span', 'icono-espiral'));
        // (sin texto «Girar»: la mano que sale al pasar el ratón ya enseña el gesto)
        var ondaP = F.el('span', 'onda-pista al-pasar'), manoP = F.el('span', 'mano-pista al-pasar');   // mano que sale siempre al pasar el ratón (css/ficha.css)
        ondaP.setAttribute('aria-hidden', 'true'); manoP.setAttribute('aria-hidden', 'true'); manoP.innerHTML = F.manoSvg;   // dibujo propio del código, sin datos externos
        arco.appendChild(ondaP); arco.appendChild(manoP);
        var colina = F.el('span', 'colina');
        colina.style.setProperty('--px', (25 + (n * 17) % 50) + '%'); // cada colina enseña otra parte del remolino
        arco.appendChild(colina);
        arco.appendChild(fig);
        cara.appendChild(arco);
        cara.appendChild(F.el('span', 'nombre-carta', m.nombre));
      },
      dorso: function (cara, m, n) {
        cara.classList.add('tarot');
        cara.style.setProperty('--v', COLORES_TARJETA[n % COLORES_TARJETA.length]);
        var ft = F.foto(m.slug); // data/fotos.json: imagen con su autor y licencia
        var a;
        if (ft) {
          a = F.el('span', 'arco con-foto');
          var im = F.imagen(F.RUTA + m.slug + '/' + ft.archivo, ft.alt.es, 'foto-dorso');
          im.loading = 'lazy'; im.decoding = 'async';
          a.appendChild(im);
          a.appendChild(F.el('span', 'foto-credito', ft.creditoCorto));
        } else {
          a = F.el('span', 'arco reverso');
          a.appendChild(F.el('span', 'icono-espiral'));
          var sin = F.sinImagen(m.slug); // texto honesto cuando no hay imagen utilizable
          if (sin) {
            a.appendChild(document.createTextNode(sin.es));
          } else {
            a.appendChild(document.createTextNode('[FOTO REAL PENDIENTE]'));
            a.appendChild(document.createElement('br'));
            a.appendChild(document.createTextNode('autor y licencia por indicar'));
          }
        }
        cara.appendChild(a);
        cara.appendChild(F.el('span', 'nombre-carta', m.cabecera));
      }
    });
    tarjetas[m.slug] = tarjeta;
    car.appendChild(tarjeta);
  });
  F.pistaGiro(car); // la mano que enseña a girar las cartas, hasta que se gira la primera
}).catch(F.errorDatos);

// Vídeo del juego: se reproduce solo cuando se ve y los efectos están activados; el botón lo pausa o lo lanza aunque estén desactivados.
(function () {
  var v = document.getElementById('videoJuego'), b = document.getElementById('btnVideo');
  if (!v || !b) { return; }
  var visible = false, usuario = null; // usuario: null (automático), 'play' o 'pausa'
  function pintar() { b.textContent = v.paused ? 'Reproducir vídeo' : 'Pausar vídeo'; b.setAttribute('aria-pressed', v.paused ? 'false' : 'true'); }
  function ajustar() {
    var quiere = usuario === 'play' ? visible : usuario === 'pausa' ? false : (document.body.classList.contains('fx') && visible);
    if (quiere && v.paused) { var pr = v.play(); if (pr && pr.catch) { pr.catch(function () { /* el navegador no deja reproducir: queda el botón */ }); } }
    else if (!quiere && !v.paused) { v.pause(); }
  }
  v.addEventListener('play', pintar); v.addEventListener('pause', pintar);
  b.addEventListener('click', function () { usuario = v.paused ? 'play' : 'pausa'; ajustar(); });
  if ('IntersectionObserver' in window) { new IntersectionObserver(function (e) { visible = e[0].isIntersecting; ajustar(); }, { threshold: 0.25 }).observe(v); } else { visible = true; ajustar(); }
  new MutationObserver(ajustar).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  pintar();
})();
