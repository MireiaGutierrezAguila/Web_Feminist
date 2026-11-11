/* Ficha de la mujer abierta en su sitio, dentro de la fila (carrusel).
   Necesita js/comun.js (objeto F) y css/ficha.css. Los textos de las fichas vienen de data/mujeres.json
   y NO se modifican; los objetos relacionados vienen de data/objetos.json. */
(function () {
  var F = window.F;
  var RUTA_J = '../public/images/juego/';
  // Textos de interfaz (irán al archivo de idiomas). No son contenido de las fichas.
  var TXT = { cerrar: 'Cerrar ficha', quienFue: '¿Quién fue ', fuentes: 'Fuentes: ' };
  var objetos = {};
  var abierta = null;

  F.cargarObjetos = function () {
    return fetch('data/objetos.json').then(function (r) { return r.json(); })
      .then(function (o) { objetos = o.objetos || {}; })
      .catch(function () { objetos = {}; }); // sin archivo, las fichas se ven sin objeto
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
    der.appendChild(F.imagen(RUTA_J + 'adornos/separador-rayas.png', '', 'fa-rayas'));
    cont.appendChild(der); f.appendChild(cont);
    li.appendChild(f);
    return f;
  }

  // Cierra la ficha abierta de una tarjeta (y devuelve el foco al botón «Ver ficha» si se pide)
  F.cerrarFicha = function (li, devolverFoco) {
    li.classList.remove('abierta');
    var b = li.querySelector('.ver-ficha');
    if (b) { b.setAttribute('aria-expanded', 'false'); if (devolverFoco) { b.focus(); } }
    if (abierta === li) { abierta = null; }
  };

  // Abre la ficha dentro de la propia fila, ensanchando la tarjeta; solo hay una abierta a la vez
  F.abrirFicha = function (li, m) {
    if (abierta && abierta !== li) { F.cerrarFicha(abierta, false); }
    if (!li._ficha) { li._ficha = construir(m, li); }
    li.classList.add('abierta');
    var b = li.querySelector('.ver-ficha');
    if (b) { b.setAttribute('aria-expanded', 'true'); }
    abierta = li;
    // El nombre se ajusta cuando la ficha ya tiene su ancho final (tras la animación)
    setTimeout(function () { li._ajustarNombre(); }, F.reduce ? 0 : 650);
    li._tituloFicha.focus({ preventScroll: true });
    setTimeout(function () { li.scrollIntoView({ behavior: F.reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' }); }, F.reduce ? 0 : 420);
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && abierta) { F.cerrarFicha(abierta, true); }
  });
})();
