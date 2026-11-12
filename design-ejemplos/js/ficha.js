/* Ficha de la mujer abierta en su sitio, dentro de la fila (carrusel).
   Necesita js/comun.js (objeto F) y css/ficha.css. Los textos de las fichas vienen de data/mujeres.json
   y NO se modifican; los objetos relacionados vienen de data/objetos.json. */
(function () {
  var F = window.F;
  var RUTA_J = '../public/images/juego/';
  // Textos de interfaz (irán al archivo de idiomas). No son contenido de las fichas.
  var TXT = { cerrar: 'Cerrar ficha', quienFue: '¿Quién fue ', fuentes: 'Fuentes: ', imagen: 'Imagen del dorso: ', origen: 'Origen', licencia: 'Licencia', girar: 'Girar' };
  F.txt = TXT; // la portada reutiliza estos textos de interfaz (irán al archivo de idiomas)
  var objetos = {};
  var abierta = null;

  F.cargarObjetos = function () {
    return fetch('data/objetos.json').then(function (r) { return r.json(); })
      .then(function (o) { objetos = o.objetos || {}; })
      .catch(function () { objetos = {}; }); // sin archivo, las fichas se ven sin objeto
  };

  // Fotos e imágenes históricas con su autor y licencia (data/fotos.json). Se muestran en el dorso de la tarjeta;
  // el crédito completo, con enlaces, va en la ficha (en el dorso no puede haber enlaces: toda la tarjeta es un botón)
  var fotos = {}, sinImagen = {};
  F.cargarFotos = function () {
    return fetch('data/fotos.json').then(function (r) { return r.json(); })
      .then(function (o) { fotos = o.fotos || {}; sinImagen = o.sinImagen || {}; })
      .catch(function () { fotos = {}; sinImagen = {}; }); // sin archivo, el dorso se queda con el aviso de «foto pendiente»
  };
  F.foto = function (slug) { return fotos[slug] || null; };
  // Texto del dorso de las mujeres de las que no hay imagen utilizable (ni retrato fiable ni licencia libre)
  F.sinImagen = function (slug) { return sinImagen[slug] || null; };

  function enlace(texto, url) {
    var a = F.el('a', '', texto); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    return a;
  }

  // Pista para girar las cartas: una mano «toca» la espiral de la primera carta visible hasta que alguien gira una carta
  // por primera vez (se recuerda en el navegador; si no hay almacenamiento, la pista vuelve a salir al recargar)
  var MANO = '<svg viewBox="0 0 40 52" aria-hidden="true" focusable="false"><path d="M16 3.5c-2.2 0-4 1.8-4 4V28l-3.2-3.4c-1.6-1.7-4.3-1.7-5.8 0-1.4 1.5-1.4 3.8 0 5.3l11.2 12.4c2.4 2.7 5.6 3.8 8.8 3.8h6.4c5.5 0 10-4.5 10-10V25.500c0-2.2-1.8-4-4-4-.9 0-1.700.3-2.400.8-.8-1.100-2.100-1.800-3.500-1.800-1 0-1.900.3-2.600.8-.8-1.100-2.100-1.800-3.500-1.800H20V7.500c0-2.200-1.800-4-4-4z" fill="#F0D58A" stroke="#3a2a00" stroke-width="2" stroke-linejoin="round"/></svg>';

  F.pistaGiro = function (car) {
    var visto = false;
    try { visto = localStorage.getItem('pistaGiro') === '1'; } catch (e) { /* sin almacenamiento */ }
    if (visto || !('IntersectionObserver' in window)) { return; }
    var puesta = []; // elementos de la pista, para quitarlos al girar una carta

    function quitar() {
      puesta.forEach(function (n) { n.remove(); });
      puesta = [];
      try { localStorage.setItem('pistaGiro', '1'); } catch (e) { /* idem */ }
      car.removeEventListener('click', alGirar);
    }
    function alGirar(e) { if (e.target.closest('.giro')) { quitar(); } }

    function poner() {
      var r = car.getBoundingClientRect();
      var tarjetas = Array.prototype.slice.call(car.querySelectorAll('.tarjeta'));
      // La primera tarjeta que se ve entera dentro de la fila (la fila se desplaza en horizontal)
      var li = tarjetas.filter(function (t) { var b = t.getBoundingClientRect(); return b.left >= r.left - 2 && b.right <= r.right + 2; })[0] || tarjetas[0];
      var arco = li && li.querySelector('.cara.frente .arco');
      if (!arco) { return; }
      var onda = F.el('span', 'onda-pista'); onda.setAttribute('aria-hidden', 'true');
      var mano = F.el('span', 'mano-pista'); mano.setAttribute('aria-hidden', 'true');
      mano.innerHTML = MANO; // constante del propio código, sin datos externos
      arco.appendChild(onda); arco.appendChild(mano);
      puesta = [onda, mano];
      car.addEventListener('click', alGirar);
    }

    var obs = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting && !puesta.length) { poner(); obs.disconnect(); }
    }, { threshold: 0.6 });
    obs.observe(car);
  };

  // Reduce la letra del nombre hasta que cabe en una línea; si aun así no cabe, lo parte en dos con un mínimo legible
  function ajustarTexto(n) {
    var t = 2.1; n.style.whiteSpace = 'nowrap'; n.style.fontSize = t + 'rem';
    while (n.scrollWidth > n.clientWidth + 1 && t > 0.95) { t -= 0.05; n.style.fontSize = t + 'rem'; }
    if (n.scrollWidth > n.clientWidth + 1) {
      n.style.whiteSpace = 'normal';
      while ((n.scrollWidth > n.clientWidth + 1 || n.scrollHeight > n.clientHeight + 1) && t > 0.75) { t -= 0.05; n.style.fontSize = t + 'rem'; }
    }
  }

  function construir(m, li) {
    var f = F.el('section', 'fa-ficha');
    f.id = 'ficha-' + m.slug;
    f.setAttribute('aria-label', 'Ficha de ' + m.nombre);

    var x = F.el('button', 'fa-cerrar'); x.type = 'button'; x.setAttribute('aria-label', TXT.cerrar);
    x.addEventListener('click', function () { F.cerrarFicha(li, true); });
    f.appendChild(x);

    var cab = F.el('div', 'fa-cab');
    var ob = objetos[m.slug];
    if (ob) { cab.appendChild(F.imagen(F.RUTA + m.slug + '/' + ob.imagen, ob.alt.es, 'fa-objeto')); }
    var cartel = F.el('div', 'fa-cartel');
    var h = F.el('h3', '', m.nombre); h.tabIndex = -1;
    cartel.appendChild(h); cab.appendChild(cartel); f.appendChild(cab);
    li._ajustarNombre = function () { ajustarTexto(h); };
    li._tituloFicha = h;

    var cont = F.el('div', 'fa-cont');
    var fig = F.el('figure', 'fa-retrato'), marco = F.el('div', 'fa-marco'), fondo = F.el('div', 'fa-fondo');
    fondo.appendChild(F.imagen(F.RUTA + m.slug + '/completa.png', 'Dibujo de ' + m.nombre));
    marco.appendChild(fondo); marco.appendChild(F.imagen(RUTA_J + 'marcos/marco-retrato.png', '', 'fa-borde'));
    fig.appendChild(marco);
    var cap = F.el('figcaption');
    cap.appendChild(F.el('div', 'fa-datos', m.profesionLugar)); cap.appendChild(F.el('div', 'fa-fechas', m.cabecera));
    fig.appendChild(cap); cont.appendChild(fig);

    var der = F.el('div', 'fa-texto');
    der.appendChild(F.el('p', 'fa-perg', m.logro));
    var q = F.el('div', 'fa-quien');
    q.appendChild(F.el('h4', '', TXT.quienFue + m.nombre + '?')); // el dato quienTitulo está incompleto («¿Quién fue ?»); no se modifica
    q.appendChild(F.el('p', '', m.quien)); der.appendChild(q);
    var fu = F.el('p', 'fa-fuentes'); fu.appendChild(F.el('strong', '', TXT.fuentes));
    fu.appendChild(F.el('span', /PENDIENTE/.test(m.fuentes) ? 'fa-pend' : '', m.fuentes)); der.appendChild(fu);
    var ft = F.foto(m.slug);
    if (ft) { // crédito completo de la imagen del dorso, con enlaces al origen y a la licencia
      var cr = F.el('p', 'fa-credito'); cr.appendChild(F.el('strong', '', TXT.imagen));
      cr.appendChild(document.createTextNode(ft.credito + ' '));
      cr.appendChild(enlace(TXT.origen, ft.fuenteUrl)); cr.appendChild(document.createTextNode(' · '));
      cr.appendChild(enlace(TXT.licencia, ft.licenciaUrl)); der.appendChild(cr);
    }
    der.appendChild(F.imagen(RUTA_J + 'adornos/separador-rayas.png', '', 'fa-rayas'));
    cont.appendChild(der); f.appendChild(cont);
    li.appendChild(f);
    return f;
  }

  // Altura de la página justo antes de abrir la primera ficha: al cerrarla se vuelve a ella, para que la fila no «salte» a otra sección
  var yAntes = null;

  // Cierra la ficha abierta de una tarjeta (y devuelve el foco al botón «Ver ficha» si se pide).
  // sinScroll: se usa al pasar de una ficha a otra, para no mover la página entre medias
  F.cerrarFicha = function (li, devolverFoco, sinScroll) {
    li.classList.remove('abierta');
    var b = li.querySelector('.ver-ficha');
    if (b) { b.setAttribute('aria-expanded', 'false'); if (devolverFoco) { b.focus({ preventScroll: true }); } }
    if (abierta === li) { abierta = null; }
    // Al cerrarse, la página se acorta de golpe: se recupera la altura de antes de abrir
    if (!sinScroll && yAntes !== null) { window.scrollTo({ top: yAntes, behavior: 'auto' }); yAntes = null; }
  };

  // Abre la ficha dentro de la propia fila, ensanchando la tarjeta; solo hay una abierta a la vez
  F.abrirFicha = function (li, m) {
    if (abierta === null) { yAntes = window.scrollY; }
    if (abierta && abierta !== li) { F.cerrarFicha(abierta, false, true); }
    if (!li._ficha) { li._ficha = construir(m, li); }
    li.classList.add('abierta');
    var b = li.querySelector('.ver-ficha');
    if (b) { b.setAttribute('aria-expanded', 'true'); }
    abierta = li;
    // El nombre se ajusta cuando la ficha ya tiene su ancho final (tras la animación)
    setTimeout(function () { li._ajustarNombre(); }, F.reduce ? 0 : 650);
    li._tituloFicha.focus({ preventScroll: true });
    // La ficha queda centrada en la pantalla (si es más alta que la pantalla, se alinea arriba para no cortar la cabecera)
    setTimeout(function () {
      var alta = li.getBoundingClientRect().height > window.innerHeight;
      li.scrollIntoView({ behavior: F.reduce ? 'auto' : 'smooth', inline: 'center', block: alta ? 'start' : 'center' });
    }, F.reduce ? 0 : 420);
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && abierta) { F.cerrarFicha(abierta, true); }
  });
})();
