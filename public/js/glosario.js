/* Glosario feminista: una letra cada vez, botón «Ver todas» y buscador (de design-ejemplos/glosario-boceto.html).
   Datos en /data/glosario.json: definiciones LITERALES del glosario «Dones i feminismes» (Ajuntament de Barcelona); no se modifican.
   El idioma (window.IDIOMA) y los textos (window.TXT) los pone la página (src/pages/[lang]/glosario.astro). */
(function () {
  'use strict';
  var LANG = window.IDIOMA || 'es', T = window.TXT || {};
  /* Texto de interfaz con huecos: t('letra', { l: 'A' }) → «Letra A» */
  function t(clave, datos) {
    var s = T[clave]; if (s === undefined) { return clave; }
    Object.keys(datos || {}).forEach(function (k) { s = s.replace('{' + k + '}', datos[k]); });
    return s;
  }
  function palabras(n) { return t(n === 1 ? 'palabra1' : 'palabraN', { n: n }); }
  function aLetra(l, n) { return t('letra', { l: l }) + ': ' + palabras(n); }

  var datos = null, porLetra = {}, letras = [], modo = null;
  function $(id) { return document.getElementById(id); }
  function el(tg, c, x) { var e = document.createElement(tg); if (c) { e.className = c; } if (x !== undefined) { e.textContent = x; } return e; }
  /* Si falta la traducción (marcador pendiente) se usa el castellano */
  function L(o, campo) { var v = o[LANG] && o[LANG][campo]; return v && v.indexOf('[TRADUCCIÓN') !== 0 ? v : o.es[campo]; }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  /* La letra de cada palabra sale de la palabra en el idioma de la página («Techo de cristal» va en la T,
     «Sostre de vidre» en la S y «Glass ceiling» en la G) */
  function letraDe(tm) { return norm(L(tm, 'termino')).charAt(0).toUpperCase(); }

  function tarjeta(tm, conLetra) {
    var d = el('details', 'termino'), s = el('summary', '', L(tm, 'termino')), c = el('div', 'def');
    d.id = 't-' + tm.id; c.appendChild(el('p', '', L(tm, 'definicion')));
    if (conLetra) { s.insertBefore(el('span', 'letra-chip', tm._letra), null); }
    d.appendChild(s); d.appendChild(c); return d;
  }
  function imgLetra(l, alto) { var i = new Image(); i.src = '/img/opt/glosario/letra-' + l.toLowerCase() + '.webp'; i.alt = ''; i.height = alto; i.decoding = 'async'; return i; }
  function grupo(l, peque) {
    var g = el('div', 'grupo'), cab = el('div', 'cab-letra' + (peque ? ' peque' : '')), h = el('h2', '', t('letra', { l: l }) + ' · ' + palabras(porLetra[l].length)), ul = el('ul', 'terminos');
    cab.appendChild(imgLetra(l, peque ? 72 : 120)); cab.appendChild(h); g.appendChild(cab);
    porLetra[l].forEach(function (tm) { var li = el('li'); li.appendChild(tarjeta(tm, false)); ul.appendChild(li); }); g.appendChild(ul); return g;
  }
  function marcar(activo) {
    Array.prototype.forEach.call($('abc').children, function (b) { b.setAttribute('aria-pressed', b.dataset.k === activo ? 'true' : 'false'); });
  }
  function limpiarLista() { $('lista').textContent = ''; }
  function verLetra(l) {
    modo = l; $('q').value = ''; $('qLimpiar').hidden = true; marcar(l); limpiarLista(); $('lista').appendChild(grupo(l, false));
    $('estado').textContent = aLetra(l, porLetra[l].length);
  }
  function verTodas() {
    modo = '*'; $('q').value = ''; $('qLimpiar').hidden = true; marcar('*'); limpiarLista();
    letras.forEach(function (l) { $('lista').appendChild(grupo(l, true)); });
    $('estado').textContent = t('totalTodas', { n: datos.terminos.length });
  }
  function buscar(q) {
    var n = norm(q.trim()), res, ul;
    $('qLimpiar').hidden = !q; if (!n) { if (modo === 'busqueda') { verLetra(letras[0]); } return; }
    modo = 'busqueda'; marcar(null); limpiarLista();
    /* primero las palabras cuyo nombre coincide; después las que solo lo mencionan en la definición */
    var enNombre = datos.terminos.filter(function (tm) { return norm(L(tm, 'termino')).indexOf(n) !== -1 || norm(tm.es.termino).indexOf(n) !== -1; });
    var enDef = datos.terminos.filter(function (tm) { return enNombre.indexOf(tm) === -1 && norm(L(tm, 'definicion')).indexOf(n) !== -1; });
    res = enNombre.concat(enDef);
    $('estado').textContent = res.length ? t(res.length === 1 ? 'resultado1' : 'resultadoN', { n: res.length, q: q.trim() }) : '';
    if (!res.length) { $('lista').appendChild(el('p', 'vacio', t('sinResultados', { q: q.trim() }))); return; }
    ul = el('ul', 'terminos'); res.forEach(function (tm) { var li = el('li'); li.appendChild(tarjeta(tm, true)); ul.appendChild(li); }); $('lista').appendChild(ul);
  }
  /* Enlace directo a una palabra (#sororidad, el mismo en todos los idiomas): abre su letra y la tarjeta */
  function irAPalabra(id) {
    var tm = datos.terminos.filter(function (x) { return x.id === id; })[0]; if (!tm) { return false; }
    verLetra(tm._letra); var d = $('t-' + id); d.open = true; d.classList.add('destacado');
    d.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); return true;
  }
  function hash() { var h = decodeURIComponent(location.hash.replace('#', '')); if (!h || !irAPalabra(h)) { if (!modo) { verLetra(letras[0]); } } }

  function montarAbc() {
    var a = $('abc'), b = el('button', 'todas', t('todas')); b.type = 'button'; b.dataset.k = '*'; b.addEventListener('click', verTodas); a.appendChild(b);
    letras.forEach(function (l) {
      var x = el('button'); x.type = 'button'; x.dataset.k = l; x.setAttribute('aria-label', aLetra(l, porLetra[l].length)); x.appendChild(imgLetra(l, 62));
      x.addEventListener('click', function () { verLetra(l); }); a.appendChild(x);
    });
  }

  fetch('/data/glosario.json').then(function (r) { if (!r.ok) { throw new Error(r.status); } return r.json(); }).then(function (d) {
    datos = d;
    /* Orden alfabético en el idioma de la página */
    var orden = d.terminos.slice().sort(function (x, y) { return L(x, 'termino').localeCompare(L(y, 'termino'), LANG); });
    orden.forEach(function (tm) { tm._letra = letraDe(tm); if (!porLetra[tm._letra]) { porLetra[tm._letra] = []; } porLetra[tm._letra].push(tm); });
    letras = Object.keys(porLetra).sort();
    var c = $('creditoPie'), a = el('a', '', t('creditoEnlace')); a.href = d.fuente.url[LANG] || d.fuente.url.es; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', t('creditoEnlace') + t('nuevaPestana'));
    c.appendChild(document.createTextNode(t('credito'))); c.appendChild(a);
    montarAbc(); hash();
    $('q').addEventListener('input', function () { buscar(this.value); });
    $('qLimpiar').addEventListener('click', function () { verLetra(letras[0]); $('q').focus(); });
    window.addEventListener('hashchange', hash);
  }).catch(function () { var e = $('msgError'); e.textContent = t('errorCarga'); e.hidden = false; });
})();
