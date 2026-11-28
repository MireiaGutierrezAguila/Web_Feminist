/* Código común de las propuestas A, B y C (maqueta).
   Lee data/mujeres.json (el contenido va en archivos de datos) y ofrece utilidades
   para construir tarjetas, fichas y efectos. */
(function () {
  var RUTA = '/images/mujeres/';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Los efectos arrancan activados salvo que la persona prefiera menos movimiento
  var efectos = !reduce;
  try { var g = localStorage.getItem('fx'); if (g !== null) efectos = g === '1'; } catch (e) { /* sin almacenamiento: se usa el valor por defecto */ }

  var F = window.F = { RUTA: RUTA, reduce: reduce, mujeres: [] };
  F.efectosOn = function () { return efectos; };

  /* ---------- Idioma ---------- */
  // La página (src/layouts/Base.astro) deja el idioma en window.IDIOMA y los textos de interfaz en window.TXT
  F.lang = window.IDIOMA || 'es';
  var TXT = window.TXT || {};
  // Texto de interfaz; {nombre} se cambia por el nombre de la mujer. Si faltara, se ve la clave (así se nota enseguida)
  F.t = function (clave, nombre) {
    var s = TXT[clave];
    if (s === undefined) return clave;
    return nombre === undefined ? s : s.replace('{nombre}', nombre);
  };
  // Dato con un campo por idioma ({ es, ca, en }): el del idioma de la página o, si falta o está sin traducir, el castellano
  F.dato = function (o) {
    if (!o) return '';
    var v = o[F.lang];
    return (typeof v === 'string' && v && v.indexOf('PENDIENTE]') === -1) ? v : o.es;
  };

  F.el = function (tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto !== undefined) n.textContent = texto;
    return n;
  };
  F.imagen = function (src, alt, clase) {
    var i = new Image();
    i.src = src; i.alt = alt;
    if (clase) i.className = clase;
    return i;
  };
  F.porSlug = function (s) { return F.mujeres.find(function (m) { return m.slug === s; }); };

  // Posición de una capa dentro del cuadro de 512 px de la imagen completa (valores medidos en el navegador)
  function colocar(img, c) {
    img.style.left = (c.dx / 512 * 100) + '%';
    img.style.top = (c.dy / 512 * 100) + '%';
    img.style.width = (c.s * 100) + '%';
  }

  /* ---------- Efectos, idiomas ---------- */
  function pintar() {
    document.body.classList.toggle('fx', efectos);
    var b = document.getElementById('fxBtn');
    if (b) b.textContent = efectos ? F.t('quitarEfectos') : F.t('ponerEfectos');
  }
  F.iniciar = function () {
    pintar();
    var b = document.getElementById('fxBtn');
    if (b) b.addEventListener('click', function () {
      efectos = !efectos;
      try { localStorage.setItem('fx', efectos ? '1' : '0'); } catch (e) { /* idem */ }
      pintar();
    });
    // El selector de idioma son enlaces normales a /es/, /ca/ y /en/ (src/components/portada/Cabecera.astro): no necesita código
  };

  // Luz que sigue al ratón o al dedo: guarda --lx y --ly (en px) relativos al elemento "objetivo"
  F.luz = function (zona, objetivo) {
    zona.addEventListener('pointermove', function (e) {
      if (!efectos) return;
      var r = objetivo.getBoundingClientRect();
      objetivo.style.setProperty('--lx', (e.clientX - r.left) + 'px');
      objetivo.style.setProperty('--ly', (e.clientY - r.top) + 'px');
      objetivo.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      objetivo.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    });
  };

  /* ---------- Figura de la mujer: imagen completa + capas (cuerpo y cabeza) ---------- */
  F.figura = function (m, n) {
    var fig = F.el('span', 'figura');
    fig.appendChild(F.imagen(RUTA + m.slug + '/completa.png', F.t('dibujoDe', m.nombre), 'completa'));
    var capas = F.el('span', 'capas');
    var cu = F.imagen(RUTA + m.slug + '/cuerpo.png', '', 'cuerpo'); colocar(cu, m.capas.cuerpo);
    var ca = F.imagen(RUTA + m.slug + '/cabeza.png', '', 'cabeza'); colocar(ca, m.capas.cabeza);
    ca.style.setProperty('--retardo', (-(n || 0) * 0.6) + 's'); // cada una se mueve a su ritmo
    capas.appendChild(cu); capas.appendChild(ca);
    fig.appendChild(capas);
    // Cuando las dos piezas están decodificadas se activa el movimiento de la cabeza
    Promise.all([cu.decode(), ca.decode()]).then(function () { fig.classList.add('lista'); }).catch(function () { /* si falla, queda la imagen completa */ });
    return fig;
  };

  /* ---------- Tarjeta (marco que se inclina y gira) ---------- */
  F.giro = function (b) {
    b.addEventListener('click', function () {
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  };
  F.tilt = function (tilt, tin) {
    tilt.addEventListener('pointermove', function (e) {
      if (!efectos) return;
      var r = tilt.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      tin.style.transform = 'rotateX(' + (-y * 14).toFixed(1) + 'deg) rotateY(' + (x * 14).toFixed(1) + 'deg)';
    });
    function plano() { tin.style.transform = ''; }
    tilt.addEventListener('pointerleave', plano);
    tilt.addEventListener('pointercancel', plano);
    tilt.addEventListener('pointerup', function (e) { if (e.pointerType === 'touch') plano(); });
  };

  // cfg.frente(cara, m, figura, n) y cfg.dorso(cara, m, n) rellenan cada cara según la propuesta
  F.tarjeta = function (m, n, cfg) {
    var li = F.el('li', 'tarjeta ' + (cfg.clase || ''));
    var tilt = F.el('div', 'tilt'), tin = F.el('div', 'tilt-in');
    var b = F.el('button', 'giro');
    b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', F.t('girarRetrato', m.nombre));
    var gin = F.el('span', 'giro-in');
    var fr = F.el('span', 'cara frente'), dr = F.el('span', 'cara dorso');
    cfg.frente(fr, m, F.figura(m, n), n);
    cfg.dorso(dr, m, n);
    gin.appendChild(fr); gin.appendChild(dr); b.appendChild(gin); tin.appendChild(b); tilt.appendChild(tin);
    F.giro(b); F.tilt(tilt, tin);
    var ver = F.el('button', 'ver-ficha', F.t('verFicha'));
    ver.type = 'button';
    ver.addEventListener('click', function () {
      if (cfg.alVerFicha) { cfg.alVerFicha(m, li); return; } // portada D: la ficha se abre en su sitio, dentro de la fila
      F.ficha(m, document.getElementById('ficha'));
      document.getElementById('mujeres').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
    li.appendChild(tilt); li.appendChild(ver);
    return li;
  };

  /* ---------- Ficha en placa clara (textos de Mireia, sin tocar) ---------- */
  F.ficha = function (m, cont) {
    cont.textContent = '';
    var p = F.el('div', 'placa');
    p.appendChild(F.el('h3', '', m.nombre));
    p.appendChild(F.el('p', 'fechas', m.cabecera));
    p.appendChild(F.el('p', '', m.profesionLugar));
    var logro = F.el('div', 'logro');
    logro.appendChild(F.el('strong', '', F.t('logro')));
    logro.appendChild(document.createTextNode(m.logro));
    p.appendChild(logro);
    var d = F.el('details', 'quien');
    d.appendChild(F.el('summary', '', m.quienTitulo));
    d.appendChild(F.el('p', '', m.quien));
    p.appendChild(d);
    var f = F.el('a', 'fuentes-btn', F.t('fuentesBoton'));
    f.href = '#fuentes';
    f.appendChild(F.el('span', 'pendiente', m.fuentes));
    p.appendChild(f);
    cont.appendChild(p);
  };

  /* ---------- Carga de datos ---------- */
  F.cargar = function () {
    return fetch('/data/mujeres.json').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (d) {
      // Cada ficha lleva su traducción en m.ca / m.en: si existe, sus textos sustituyen a los del castellano
      // (el castellano de Mireia no se toca: solo se elige qué versión enseñar)
      d.forEach(function (m) {
        var tr = m[F.lang];
        if (F.lang === 'es' || !tr) return;
        Object.keys(tr).forEach(function (k) { if (typeof tr[k] === 'string' && tr[k]) m[k] = tr[k]; });
      });
      F.mujeres = d; return d;
    });
  };
  F.errorDatos = function () {
    var cont = document.getElementById('ficha');
    if (cont) cont.appendChild(F.el('p', 'error', F.t('errorDatos')));
  };

  /* ---------- Lluvia de código decorativa ---------- */
  F.codigo = function (cont, columnas) {
    for (var i = 0; i < columnas; i++) {
      var c = F.el('span', 'col');
      var t = '';
      for (var j = 0; j < 26; j++) t += (Math.random() < .5 ? '0' : '1') + '\n';
      c.textContent = t;
      c.setAttribute('aria-hidden', 'true');
      c.style.left = (i * (100 / columnas) + 1) + '%';
      c.style.animationDuration = (7 + Math.random() * 8).toFixed(1) + 's';
      c.style.animationDelay = (-Math.random() * 10).toFixed(1) + 's';
      cont.appendChild(c);
    }
  };
})();
