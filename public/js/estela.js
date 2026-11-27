/* Puntero con estela (como en la web de referencia que eligió Mireia): un aro dorado con resplandor, un destello en el centro y una pequeña línea
   en diagonal, y detrás una cola de puntitos dorados separados: grandes junto al aro y cada vez más pequeños y transparentes. Con el ratón quieto la cola vuelve al aro.
   Sustituye a la flecha del sistema.
   - Sin librerías: un canvas fijo encima de la página que no intercepta clics.
   - Solo con ratón: en pantallas táctiles no se activa (no hay puntero).
   - Se apaga con «Quitar/Parar efectos» (portada: body sin clase fx; actividades: body con clase sin-efectos) y con prefers-reduced-motion: vuelve la flecha normal.
   - Sobre campos de texto y sobre lo que lleve data-cursor-propio (p. ej. el pincel de «Adivina el porcentaje») se ve el puntero normal.
   - Si hay una ventana <dialog> modal abierta, el canvas pasa a vivir dentro de ella (si no, quedaría por debajo, en la capa superior del navegador).
   - Se dibuja solo mientras algo se mueve o se desvanece. */
(function () {
  'use strict';

  var N = 13;                  // puntitos de la cola
  var DT = 34;                 // ms de retraso entre un puntito y el siguiente: cada puntito va donde estaba el aro hace i·DT ms
                               // (mayor = más separados y cola más larga; al parar el ratón toda la cola vuelve al aro en N·DT ms)
  var R_MAX = 6.5, R_MIN = 0.9;// radio del puntito junto al aro y del último de la cola
  var SIGUE = 0.35;            // 0-1: cuánto se acerca el aro al ratón en cada fotograma (menor = más pausado)
  var RADIO = 13, RADIO_GRANDE = 20;   // el aro crece sobre enlaces y botones
  var INTERACTIVO = 'a, button, summary, [role="button"], label, .giro, [tabindex]:not([tabindex="-1"])';
  var NATIVO = 'input, textarea, select, [data-cursor-propio]';

  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches || !window.matchMedia('(hover: hover)').matches) { return; }
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)');

  var html = document.documentElement;
  var estilo = document.createElement('style');
  estilo.textContent = 'html.puntero-estela:not(.puntero-estela-nativo), html.puntero-estela:not(.puntero-estela-nativo) * { cursor: none !important; }';
  document.head.appendChild(estilo);

  var canvas = document.createElement('canvas');
  canvas.id = 'estela-canvas'; canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483000;';
  var ctx = canvas.getContext('2d');
  var dpr = 1, ancho = 0, alto = 0;

  var raton = { x: 0, y: 0, visto: false };
  var cabeza = { x: 0, y: 0 };
  var hist = [];            // recorrido reciente del aro: {t, x, y}
  var ultimoMov = 0;
  var grande = 0, objGrande = 0, pulsado = 0, objPulsado = 0;
  var nativo = false, corriendo = false, activa = false;

  function ajustar() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = window.innerWidth; alto = window.innerHeight;
    canvas.width = Math.round(ancho * dpr); canvas.height = Math.round(alto * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function efectosPermitidos() {
    var c = document.body.classList;
    if (c.contains('sin-efectos')) { return false; }            // actividades: botón «Parar efectos»
    if (typeof window.F !== 'undefined' && !c.contains('fx')) { return false; }   // portada: botón «Quitar efectos»
    return true;
  }
  function debeEstarActiva() { return efectosPermitidos() && !reducido.matches; }

  /* El canvas va dentro de la <dialog> modal abierta (si la hay) o en el body */
  function colocar() {
    var padre = document.querySelector('dialog[open]') || document.body;
    if (canvas.parentNode !== padre) { padre.appendChild(canvas); }
  }
  function activar() {
    if (!activa) { activa = true; html.classList.add('puntero-estela'); ajustar(); }
    colocar();
  }
  function desactivar() {
    if (!activa) { return; }
    activa = false; html.classList.remove('puntero-estela'); html.classList.remove('puntero-estela-nativo');
    ctx.clearRect(0, 0, ancho, alto); hist = [];
    if (canvas.parentNode) { canvas.parentNode.removeChild(canvas); }
  }
  function revisar() { if (debeEstarActiva()) { activar(); } else { desactivar(); } }

  function destello(x, y, r) {   // estrellita de cuatro puntas
    ctx.beginPath();
    ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
  }

  function dibujar(ahora) {
    var i, p, d, t, r, a;
    ctx.clearRect(0, 0, ancho, alto);
    if (!raton.visto || nativo) { return; }
    // cola: el puntito i va donde estaba el aro hace i·DT ms (i = 1 el más grande, junto al aro)
    for (i = N; i >= 1; i--) {
      p = posEn(ahora - i * DT); d = Math.sqrt((p.x - cabeza.x) * (p.x - cabeza.x) + (p.y - cabeza.y) * (p.y - cabeza.y));
      t = 1 - (i - 1) / N; r = R_MIN + (R_MAX - R_MIN) * Math.pow(t, 1.1); a = (0.14 + 0.55 * t) * Math.min(1, Math.max(0, (d - 5) / 10));   // si vuelve al aro, se funde con él
      if (a <= 0.01) { continue; }
      ctx.beginPath(); ctx.arc(p.x, p.y, r + 0.9, 0, 6.2832); ctx.fillStyle = 'rgba(16, 16, 16, ' + (a * 0.3) + ')'; ctx.fill();   // borde oscuro muy suave: se ve también sobre fondos claros
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832); ctx.fillStyle = 'rgba(214, 190, 120, ' + a + ')'; ctx.fill();
    }
    // cabeza: aro con resplandor, destello y rayita en diagonal
    var x = cabeza.x, y = cabeza.y, rad = (RADIO + (RADIO_GRANDE - RADIO) * grande) * (1 - 0.2 * pulsado);
    ctx.save();
    ctx.shadowColor = 'rgba(255, 240, 200, .75)'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.lineWidth = 3.2; ctx.strokeStyle = 'rgba(16, 16, 16, .5)'; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.lineWidth = 1.8; ctx.strokeStyle = 'rgba(236, 216, 160, .95)'; ctx.stroke();
    ctx.restore();
    ctx.beginPath(); ctx.arc(x, y, rad - 3.2, 0, 6.2832); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(214, 190, 120, .35)'; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, rad - 1, 0, 6.2832); ctx.fillStyle = 'rgba(214, 190, 120, ' + (0.16 + 0.2 * grande) + ')'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + 1, y + 1); ctx.lineTo(x + rad * 0.62, y + rad * 0.78); ctx.lineWidth = 1.2; ctx.strokeStyle = 'rgba(236, 216, 160, .85)'; ctx.stroke();
    ctx.fillStyle = 'rgba(255, 250, 235, .98)'; destello(x, y, 4.6);
  }

  /* posición que tenía el aro en el instante t (interpolando el recorrido guardado) */
  function posEn(t) {
    var i = hist.length - 1, a, b, f;
    if (i < 0) { return cabeza; }
    while (i > 0 && hist[i].t > t) { i--; }
    if (i >= hist.length - 1) { return hist[hist.length - 1]; }
    a = hist[i]; b = hist[i + 1]; f = b.t === a.t ? 0 : Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t)));
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
  }

  function fotograma(ahora) {
    var dx = raton.x - cabeza.x, dy = raton.y - cabeza.y, mueve = dx * dx + dy * dy > 0.04;
    cabeza.x += dx * SIGUE; cabeza.y += dy * SIGUE;
    if (mueve) { ultimoMov = ahora; }
    hist.push({ t: ahora, x: cabeza.x, y: cabeza.y });
    while (hist.length > 2 && hist[1].t < ahora - N * DT - 60) { hist.shift(); }
    grande += (objGrande - grande) * 0.2; pulsado += (objPulsado - pulsado) * 0.35;
    dibujar(ahora);
    var sigue = mueve || ahora - ultimoMov < N * DT + 60 || Math.abs(objGrande - grande) > 0.01 || Math.abs(objPulsado - pulsado) > 0.01;
    if (sigue && activa) { window.requestAnimationFrame(fotograma); } else { corriendo = false; }
  }
  function arrancar() { if (!corriendo && activa) { corriendo = true; window.requestAnimationFrame(fotograma); } }

  function alMover(e) {
    if (e.pointerType && e.pointerType !== 'mouse') { return; }
    revisar();
    if (!activa) { return; }
    raton.x = e.clientX; raton.y = e.clientY;
    if (!raton.visto) { raton.visto = true; cabeza.x = raton.x; cabeza.y = raton.y; hist = []; ultimoMov = 0; }
    var t = e.target, n = !!(t && t.closest && t.closest(NATIVO));
    if (n !== nativo) { nativo = n; html.classList.toggle('puntero-estela-nativo', n); if (n) { ctx.clearRect(0, 0, ancho, alto); hist = []; } }
    objGrande = (t && t.closest && t.closest(INTERACTIVO)) ? 1 : 0;
    arrancar();
  }

  document.addEventListener('pointermove', alMover, { passive: true });
  document.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') { objPulsado = 1; arrancar(); } }, { passive: true });
  document.addEventListener('pointerup', function () { objPulsado = 0; arrancar(); }, { passive: true });
  html.addEventListener('mouseleave', function () { raton.visto = false; hist = []; if (activa) { ctx.clearRect(0, 0, ancho, alto); } });
  window.addEventListener('resize', function () { if (activa) { ajustar(); } });
  if (reducido.addEventListener) { reducido.addEventListener('change', revisar); }
  // los botones de efectos cambian la clase del body; una ventana modal cambia el atributo open de su <dialog>
  new MutationObserver(revisar).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  new MutationObserver(revisar).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['open'] });
  revisar();
})();
