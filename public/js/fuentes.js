/* Página de fuentes (referencias): une en una sola lista todo lo que la web enseña y de dónde sale: calendario, fichas,
   imágenes y actividades (de design-ejemplos/fuentes-boceto.html). Vista pública: solo contenido verificado y visible en la web.
   Vista de trabajo: añadir ?interno=1 a la dirección.
   El idioma (window.IDIOMA) y los textos (window.TXT) los pone la página (src/pages/[lang]/fuentes.astro). Los datos que tienen
   traducción salen en el idioma de la página; los que solo existen en castellano (países, temas, notas…) salen en castellano. */
(function () {
  var LANG = window.IDIOMA || 'es', TXT = window.TXT || {};
  function t(clave, datos) {
    var s = TXT[clave]; if (typeof s !== 'string') { return clave; }
    Object.keys(datos || {}).forEach(function (k) { s = s.replace('{' + k + '}', datos[k]); });
    return s;
  }
  /* Dato con un campo por idioma ({ es, ca, en }): el del idioma de la página o, si falta o está sin traducir, el castellano */
  function dato(o) {
    if (!o) { return ''; } if (typeof o === 'string') { return o; }
    var v = o[LANG]; return (typeof v === 'string' && v && v.indexOf('PENDIENTE]') === -1) ? v : o.es;
  }
  /* Actividades de la web: para añadir otra, basta su nombre en src/i18n/*.json (fuentesPagina.actividades) y que sus filas lleven donde.actividad con esa clave */
  var NOMBRES_ACT = TXT.actividades || {};
  var ACTIVIDADES = Object.keys(NOMBRES_ACT).map(function (k) { return [k, NOMBRES_ACT[k]]; });
  var params = new URLSearchParams(location.search);
  var INTERNO = params.get('interno') === '1', SENSIBLES = INTERNO || params.get('sensibles') === '1';
  if (INTERNO) { document.body.classList.add('interno'); }

  /* ---------- Estructura común de cada fila (el «contrato» de la página) ----------
     { donde:   { tipo: 'calendario' | 'ficha' | 'imagen' | 'actividad', etiqueta: 'Calendario · 16 mar', detalle: '', mes: 3 | null, orden: número },
       dato:    'texto que ve el público',  sub: 'año · país' (opcional),
       region:  'Europa' | ... | '',
       fuentes: [ { nombre, url | null } ],  comprobado: 'AAAA-MM-DD' | '',  provisional: true | false,
       interno: { estado, calidad, nota, sensible, viva, principal } }
     Para añadir otra parte de la web (por ejemplo una actividad) basta con otra función «de …» que devuelva filas con esta forma. */

  function el(tag, clase, texto) { var n = document.createElement(tag); if (clase) { n.className = clase; } if (texto !== undefined) { n.textContent = texto; } return n; }
  function json(url, opcional) {
    return fetch(url).then(function (r) { if (!r.ok) { throw new Error(url); } return r.json(); }).catch(function (e) { if (opcional) { return null; } throw e; });
  }
  function fechaLarga(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) { return ''; }
    return +m[3] + ' ' + TXT.mesesCortos[+m[2] - 1] + ' ' + m[1];
  }
  function tipo(clave) { return (TXT.tipos || {})[clave] || clave; }
  function nombreAct(clave) { return NOMBRES_ACT[clave] || clave; }

  /* ---------- Adaptadores: de cada archivo de datos a filas ---------- */
  function deCalendario(cal) {
    var filas = [];
    function fila(e, mes, dia, sinDia) {
      var vis = e.estado === 'verificada' && !e.sensible && (e.principal !== false || sinDia);
      if (!INTERNO && !vis) { return; }
      if (!INTERNO && e.sensible && !SENSIBLES) { return; }
      var etiqueta = sinDia ? tipo('calendario') + ' · ' + (mes ? TXT.meses[mes - 1] + ' (' + t('sinDia') + ')' : t('sinDia'))
                            : tipo('calendario') + ' · ' + dia + ' ' + TXT.mesesCortos[mes - 1];
      filas.push({
        donde: { tipo: 'calendario', etiqueta: etiqueta, detalle: '', mes: mes || null, orden: (mes || 13) * 100 + (dia || 0) },
        dato: e.anio + ': ' + dato(e.texto), sub: [e.pais, e.tema].filter(Boolean).join(' · '), region: e.region || '',
        fuentes: e.fuentes || [], comprobado: e.comprobado || '', provisional: false,
        interno: { estado: e.estado, calidad: e.calidadFuentes, nota: e.nota, sensible: e.sensible, viva: e.viva, principal: e.principal !== false }
      });
    }
    Object.keys(cal.dias).sort().forEach(function (k) { cal.dias[k].forEach(function (e) { fila(e, +k.slice(0, 2), +k.slice(3), false); }); });
    (cal.sinDia || []).forEach(function (e) { fila(e, e.mes, 0, true); });
    return filas;
  }
  /* Ficha de cada mujer en el idioma de la página (m.ca / m.en), si existe */
  function enIdioma(m) {
    var tr = LANG !== 'es' && m[LANG], r = {};
    Object.keys(m).forEach(function (k) { r[k] = m[k]; });
    if (tr) { Object.keys(tr).forEach(function (k) { if (typeof tr[k] === 'string' && tr[k]) { r[k] = tr[k]; } }); }
    return r;
  }
  function deFichas(mujeres, fuentes) {
    return mujeres.map(function (m0, i) {
      var m = enIdioma(m0), f = (fuentes.fichas || {})[m.slug];
      return {
        donde: { tipo: 'ficha', etiqueta: tipo('ficha') + ' · ' + m.nombre, detalle: '', mes: null, orden: 2000 + i },
        dato: m.nombre + ', ' + m.profesionLugar.replace(/\s+/g, ' ').trim() + ' (' + m.cabecera.replace(/^.*\(/, '').replace(/\)$/, '') + ')',
        sub: '', region: '', fuentes: f ? f.fuentes : [], comprobado: '2026-11-13', provisional: !!(f && f.provisional),
        interno: { estado: f ? (f.provisional ? 'parcial' : 'verificada') : 'revisar', nota: f ? '' : 'Sin fuentes' }
      };
    });
  }
  function deImagenes(fotos, mujeres) {
    var nombres = {}; mujeres.forEach(function (m) { nombres[m.slug] = enIdioma(m).nombre; });
    return Object.keys(fotos.fotos || {}).map(function (slug, i) {
      var f = fotos.fotos[slug];
      var fu = [{ nombre: t('origenImagen'), url: f.fuenteUrl }];
      if (f.licenciaUrl && f.licenciaUrl !== f.fuenteUrl) { fu.push({ nombre: t('licencia') + f.licencia, url: f.licenciaUrl }); }
      return {
        donde: { tipo: 'imagen', etiqueta: tipo('imagen') + ' · ' + (nombres[slug] || slug), detalle: '', mes: null, orden: 3000 + i },
        dato: f.creditoCorto, sub: f.credito, region: '', fuentes: fu, comprobado: f.comprobado || '', provisional: false,
        interno: { estado: 'verificada', nota: f.nota }
      };
    });
  }
  /* data/fuentes-actividades.json: sus etiquetas están escritas en castellano («Actividad · La mujer en el mundo · Mapa»);
     aquí se cambian el tipo y el nombre de la actividad por los del idioma de la página (el resto de la fila aún no está traducido) */
  function deActividades(act) {
    if (!act || !Array.isArray(act.filas)) { return []; }
    return act.filas.map(function (f) {
      var p = f.donde.etiqueta.split(' · ');
      if (f.donde.actividad && p.length >= 3) {
        p[0] = tipo(f.donde.tipo); p[1] = nombreAct(f.donde.actividad);
        var d = {}; Object.keys(f.donde).forEach(function (k) { d[k] = f.donde[k]; }); d.etiqueta = p.join(' · ');
        var c = {}; Object.keys(f).forEach(function (k) { c[k] = f[k]; }); c.donde = d; return c;
      }
      return f;
    });
  }
  /* Actividad «El Vinilo Crítico»: una fila por disco, leída de data/vinilos.json. El campo «fuente» de cada disco es un texto con el enlace de Spotify
     dentro (y, a veces, «Datos: …»): aquí se separa en fuentes. El año de la canción se muestra con su procedencia, y es provisional si no está contrastado. */
  function deVinilos(v) {
    if (!v || !Array.isArray(v.discos)) { return []; }
    return v.discos.map(function (d, i) {
      var txt = d.fuente || '', fuentes = [];
      var url = d.enlaceSpotify || (txt.match(/https?:\/\/open\.spotify\.com\/[^\s]+/) || [''])[0].replace(/[.,;]+$/, '');
      if (url) { fuentes.push({ nombre: 'Spotify: «' + d.cancion + '» (' + d.grupo + ')', url: url }); }
      var datos = /Datos:\s*(.+)$/.exec(txt); if (datos) { fuentes.push({ nombre: datos[1].replace(/\.$/, ''), url: null }); }
      var origenAnio = d.anioFuente || '';
      if (origenAnio) { fuentes.push({ nombre: t('anioCancion') + origenAnio, url: null }); }
      var dudoso = /Mireia|sin contrastar|sin verificar|secundaria/i.test(origenAnio);
      return {
        donde: { tipo: 'actividad', actividad: 'vinilos', etiqueta: tipo('actividad') + ' · ' + nombreAct('vinilos') + ' · ' + t('cancion'), detalle: '', mes: null, orden: 5000 + i },
        dato: '«' + d.cancion + '», ' + d.grupo + ' (' + d.anio + ')', sub: t('cancionDe'), region: '',
        fuentes: fuentes, comprobado: '', provisional: dudoso,
        interno: { estado: d.explicacionEstado || 'revisar', nota: d.nota || '' }
      };
    });
  }
  /* Actividad «Adivina el porcentaje»: una fila por dato y por pareja «cara a cara», leída de data/porcentajes.json. Cada uno apunta a la infografía
     de «Mujeres en cifras» (Instituto de las Mujeres) de la que sale; las fuentes que esa infografía cita (INE, Ministerio de Trabajo) se añaden como texto.
     Los nombres de las fuentes se dejan como los publica cada organismo. */
  function dePorcentajes(pc) {
    if (!pc || !pc.infografias) { return []; }
    var SECUNDARIAS = { 'p-01': 'INE: Encuesta de Estructura Salarial (cifra citada por la infografía)', 'p-02': 'Ministerio de Trabajo (MITES): Pensiones Contributivas 2021 (citado por la infografía)', 'p-15': 'Ministerio del Interior, ONVIOS: Informe sobre delitos contra la libertad sexual, enero–diciembre 2024 (una de las fuentes que cita la infografía; no indica cuál da cada cifra)', 'c-07': 'Ministerio del Interior, ONVIOS: Informe sobre delitos contra la libertad sexual, enero–diciembre 2024 (una de las fuentes que cita la infografía; no indica cuál da cada cifra)', 'p-14': 'INE (cita genérica de la infografía de Vivienda; no indica la tabla de esta cifra)' };
    function num(v, u) { return String(v).replace('.', LANG === 'en' ? '.' : ',') + (u === '%' ? ' %' : ' ' + u); }
    function fuentesDe(id, key) {
      var inf = pc.infografias[key], fs = [];
      if (inf) { fs.push({ nombre: (pc.fuenteGeneral || 'Instituto de las Mujeres') + ': infografía «' + inf.titulo + '» (' + inf.fecha + ')', url: inf.url }); }
      if (SECUNDARIAS[id]) { fs.push({ nombre: SECUNDARIAS[id], url: null }); }
      return fs;
    }
    var filas = [], n = 0, lugar = tipo('actividad') + ' · ' + nombreAct('porcentajes');
    (pc.datos || []).forEach(function (d) {
      filas.push({
        donde: { tipo: 'actividad', actividad: 'porcentajes', etiqueta: lugar + ' · ' + t('dato'), detalle: '', mes: null, orden: 6000 + n++ },
        dato: dato(d.pregunta) + ' → ' + num(d.valor, d.unidad), sub: [d.tema, d.anioDatos ? t('datosDe', { a: d.anioDatos }) : ''].filter(Boolean).join(' · '), region: '',
        fuentes: fuentesDe(d.id, d.infografia), comprobado: '', provisional: false,
        interno: { estado: d.anioDatos ? 'verificada' : 'parcial', nota: (d.anioDatos ? '' : 'Año de los datos por confirmar. ') + (d.nota || '') }
      });
    });
    (pc.parejas || []).forEach(function (pa) {
      var partes = pa.rondas.map(function (r) {
        return dato(r.pregunta) + ' ' + r.opciones.filter(function (o) { return o.valor !== null; }).map(function (o) { return dato(o.etiqueta) + ': ' + num(o.valor, o.unidad); }).join(' · ');
      });
      var dudoso = /Revisar/.test(pa.nota || '') || pa.rondas.some(function (r) { return r.opciones.some(function (o) { return o.valor === null; }); });
      filas.push({
        donde: { tipo: 'actividad', actividad: 'porcentajes', etiqueta: lugar + ' · ' + t('caraACara'), detalle: '', mes: null, orden: 6000 + n++ },
        dato: partes.join(' — '), sub: [pa.tema, pa.anioDatos ? t('datosDe', { a: pa.anioDatos }) : ''].filter(Boolean).join(' · '), region: '',
        fuentes: fuentesDe(pa.id, pa.infografia), comprobado: '', provisional: dudoso,
        interno: { estado: dudoso ? 'revisar' : (pa.anioDatos ? 'verificada' : 'parcial'), nota: (pa.anioDatos ? '' : 'Año de los datos por confirmar. ') + (pa.nota || '') }
      });
    });
    return filas;
  }
  /* Actividad «La línea del tiempo»: se lee directamente de data/timeline.json (islas-hito y hechos de las parejas), para tener una sola copia de las fuentes. */
  function deLineaTiempo(tl) {
    if (!tl) { return []; }
    var filas = [], n = 0, lugar = tipo('actividad') + ' · ' + nombreAct('timeline');
    function anios(a, b) { return a === b ? String(a) : a + '–' + b; }
    (tl.islas || []).forEach(function (i) {
      filas.push({ donde: { tipo: 'actividad', actividad: 'timeline', etiqueta: lugar + ' · ' + t('isla'), detalle: '', mes: null, orden: 4000 + n++ },
        dato: dato(i.nombre) + ' (' + anios(i.inicio, i.fin) + ')', sub: t('hitoReferencia'), region: '',
        fuentes: i.fuentes || [], comprobado: i.comprobado || '', provisional: i.estado === 'parcial', interno: { estado: i.estado, nota: i.nota || '' } });
    });
    (tl.parejas || []).forEach(function (pa) {
      pa.cartas.forEach(function (c) {
        filas.push({ donde: { tipo: 'actividad', actividad: 'timeline', etiqueta: lugar + ' · ' + t('hechoFeminista'), detalle: '', mes: null, orden: 4000 + n++ },
          dato: dato(c.titulo) + ' (' + (c.anioPin ? dato(c.anioPin) : c.anio) + ')', sub: c.pais, region: '',
          fuentes: c.fuentes || [], comprobado: c.comprobado || '', provisional: c.estado === 'parcial', interno: { estado: c.estado, nota: c.nota || '' } });
      });
    });
    return filas;
  }

  /* ---------- Estado de la página ---------- */
  var filas = [], filtros = { tipo: '', mes: '', actividad: '', region: '', q: '' };
  function $(id) { return document.getElementById(id); }

  function opciones(sel, primera, lista) {
    sel.textContent = '';
    var o = el('option', '', primera); o.value = ''; sel.appendChild(o);
    lista.forEach(function (x) { var op = el('option', '', x[1]); op.value = x[0]; sel.appendChild(op); });
  }
  function mesesConDatos() {
    var meses = []; TXT.meses.forEach(function (m, i) { if (filas.some(function (f) { return f.donde.mes === i + 1; })) { meses.push([String(i + 1), m.charAt(0).toUpperCase() + m.slice(1)]); } });
    return meses;
  }
  function rellenarFiltros() {
    var tipos = []; ['calendario', 'ficha', 'imagen', 'actividad'].forEach(function (k) { if (filas.some(function (f) { return f.donde.tipo === k; })) { tipos.push([k, TXT.tiposPlural[k]]); } });
    opciones($('fTipo'), t('todos'), tipos);
    opciones($('fMes'), t('todos'), mesesConDatos());
    var regs = {}; filas.forEach(function (f) { if (f.region) { regs[f.region] = 1; } });
    opciones($('fRegion'), t('todas'), Object.keys(regs).sort().map(function (r) { return [r, r]; }));
    ['fTipo', 'fMes', 'fRegion'].forEach(function (id) { $(id).addEventListener('change', function () {
      var clave = id === 'fMes' && filtros.tipo === 'actividad' ? 'actividad' : id.slice(1).toLowerCase();   /* con «Actividades» elegido, este desplegable es el de actividad */
      if (id === 'fTipo') { filtros.mes = ''; filtros.actividad = ''; filtros.region = ''; $('fRegion').value = ''; }   /* al cambiar de tipo se quitan los filtros que dependían del anterior */
      filtros[clave] = this.value; if (id === 'fTipo') { actualizarMes(); } pintar(); }); });
    $('btnLimpiar').addEventListener('click', limpiar);
    $('fBuscar').addEventListener('input', function () { filtros.q = plano(this.value.trim()); pintar(); });
  }
  /* el segundo desplegable es «Mes» para el calendario y «Actividad» cuando se elige Actividades; para lo demás no tiene sentido */
  function actualizarMes() {
    var sel = $('fMes'), act = filtros.tipo === 'actividad';
    /* la región solo existe en los datos del calendario: con otro tipo se desactiva, como el mes */
    var conRegion = !filtros.tipo || filtros.tipo === 'calendario'; $('fRegion').disabled = !conRegion; if (!conRegion) { filtros.region = ''; $('fRegion').value = ''; }
    if (act) {
      $('lMes').textContent = t('fActividad'); opciones(sel, t('todasAct'), ACTIVIDADES); sel.disabled = false; sel.value = filtros.actividad; filtros.mes = '';
    } else {
      $('lMes').textContent = t('fMes'); filtros.actividad = '';
      opciones(sel, t('todos'), mesesConDatos());
      var activo = !filtros.tipo || filtros.tipo === 'calendario';
      sel.disabled = !activo; if (!activo) { filtros.mes = ''; } sel.value = filtros.mes;
    }
  }
  function limpiar() {
    filtros = { tipo: '', mes: '', actividad: '', region: '', q: '' };
    $('fTipo').value = ''; $('fRegion').value = ''; $('fBuscar').value = ''; actualizarMes(); pintar(); $('fTipo').focus();
  }
  function plano(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }   /* «mexico» encuentra «México» */
  function pasa(f) {
    if (filtros.tipo && f.donde.tipo !== filtros.tipo) { return false; }
    if (filtros.mes && String(f.donde.mes) !== filtros.mes) { return false; }
    if (filtros.actividad && f.donde.actividad !== filtros.actividad) { return false; }
    if (filtros.region && f.region !== filtros.region) { return false; }
    if (filtros.q) {
      var s = plano([f.donde.etiqueta, f.dato, f.sub, f.region, f.fuentes.map(function (x) { return x.nombre; }).join(' ')].join(' '));
      if (s.indexOf(filtros.q) < 0) { return false; }
    }
    return true;
  }

  function celdaFuentes(f) {
    var td = el('td', 'fuentes');
    if (f.fuentes.length) {
      var ul = el('ul');
      f.fuentes.forEach(function (s) {
        var li = el('li');
        if (s.url) { var a = el('a', '', s.nombre); a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.appendChild(a); } else { li.textContent = s.nombre; }
        ul.appendChild(li);
      });
      td.appendChild(ul);
    } else { td.appendChild(el('span', 'comp', t('sinFuentes'))); }
    if (f.provisional) { td.appendChild(el('span', 'prov', t('provisional'))); }
    if (f.comprobado) { td.appendChild(el('span', 'comp', t('comprobado') + fechaLarga(f.comprobado))); }
    return td;
  }
  function celdasInternas(tr, f) {
    var i = f.interno || {};
    var te = el('td', 'solo-interno interno-est');
    te.appendChild(el('span', 'etq e-' + (['verificada', 'parcial', 'revisar'].indexOf(i.estado) >= 0 ? i.estado : 'otro'), i.estado || '—'));
    if (i.calidad === 'basica') { te.appendChild(el('span', 'etq e-parcial', t('basica'))); }
    if (i.sensible) { te.appendChild(el('span', 'etq e-revisar', t('sensible'))); }
    if (i.viva) { te.appendChild(el('span', 'etq e-otro', t('viva'))); }
    if (i.principal === false) { te.appendChild(el('span', 'etq e-otro', t('alternativa'))); }
    tr.appendChild(te);
    tr.appendChild(el('td', 'solo-interno interno-nota', i.nota || ''));
  }

  function pintar() {
    var cuerpo = $('cuerpo'); cuerpo.textContent = '';
    var vistas = filas.filter(pasa), mesActual = null;
    vistas.forEach(function (f) {
      var grupo = f.donde.tipo === 'calendario' ? 'c' + (f.donde.mes || 0) : f.donde.tipo;
      if (grupo !== mesActual) {
        mesActual = grupo;
        if (f.donde.tipo === 'calendario') {
          var nm = f.donde.mes ? TXT.meses[f.donde.mes - 1] : t('sinDia');
          var trm = el('tr', 'mes-fila'), tdm = el('td', '', nm.charAt(0).toUpperCase() + nm.slice(1));
          tdm.colSpan = INTERNO ? 5 : 3; trm.appendChild(tdm); cuerpo.appendChild(trm);
        }
      }
      var tr = el('tr');
      var td1 = el('td', 'donde'), partes = f.donde.etiqueta.split(' · ');
      td1.appendChild(el('span', 'donde-tipo', partes[0])); td1.appendChild(el('span', 'donde-det', partes.slice(1).join(' · ')));
      var td2 = el('td', 'dato'); td2.appendChild(document.createTextNode(f.dato));
      if (f.sub) { td2.appendChild(el('span', 'dato-sub', f.sub)); }
      tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(celdaFuentes(f)); celdasInternas(tr, f);
      cuerpo.appendChild(tr);
    });
    if (!vistas.length) { var tv = el('tr'), c = el('td', 'vacio', filtros.actividad ? t('actividadSinFuentes') : t('vacio')); c.colSpan = INTERNO ? 5 : 3; tv.appendChild(c); cuerpo.appendChild(tv); }
    $('cuenta').textContent = vistas.length === filas.length ? t('cuentaTodos', { t: filas.length }) : t('cuentaParte', { n: vistas.length, t: filas.length });
    $('btnLimpiar').disabled = !(filtros.tipo || filtros.mes || filtros.actividad || filtros.region || filtros.q);
  }

  /* ---------- Carga ---------- */
  $('cuenta').textContent = t('cargando');
  Promise.all([json('/data/calendario.json'), json('/data/mujeres.json'), json('/data/fuentes-fichas.json'), json('/data/fotos.json'), json('/data/fuentes-actividades.json', true), json('/data/timeline.json', true), json('/data/vinilos.json', true), json('/data/porcentajes.json', true)])
    .then(function (r) {
      filas = deCalendario(r[0]).concat(deFichas(r[1], r[2]), deImagenes(r[3], r[1]), deActividades(r[4]), deLineaTiempo(r[5]), deVinilos(r[6]), dePorcentajes(r[7]))
        .sort(function (a, b) { return a.donde.orden - b.donde.orden; });
      rellenarFiltros();
      /* ?tipo=actividad (o calendario, ficha, imagen) en la dirección llega con el filtro ya puesto */
      var tipoUrl = params.get('tipo');
      if (tipoUrl && filas.some(function (f) { return f.donde.tipo === tipoUrl; })) { filtros.tipo = tipoUrl; $('fTipo').value = tipoUrl; }
      var actUrl = params.get('actividad'); if (actUrl && filtros.tipo === 'actividad') { filtros.actividad = actUrl; }
      actualizarMes(); pintar();
    })
    .catch(function () { $('cuenta').textContent = t('error'); });
})();
