/* Espirales de fondo irregulares de las subpáginas (como las de la portada y las actividades).
   Si en cualquier página se quitaron los efectos (preferencia «feminist-sin-efectos», la misma que usa el botón de la portada),
   aquí no giran y la estela del puntero tampoco sale (clase sin-efectos en body, que lee js/estela.js). */
(function () {
  function irregular(vueltas, escala, semilla) {
    var pts = [];
    for (var t = 0; t <= vueltas * 2 * Math.PI; t += 0.12) {
      var r = escala * t * (1 + 0.11 * Math.sin(t * 1.3 + semilla) + 0.07 * Math.sin(t * 3.1 + 2 * semilla)), a = t + 0.06 * Math.sin(t * 2.2 + semilla);
      pts.push((r * Math.cos(a)).toFixed(1) + ' ' + (r * Math.sin(a)).toFixed(1));
    }
    return 'M' + pts.join(' L');
  }
  function pintar(id, vueltas, escala, semilla) {
    var svg = document.getElementById(id); if (!svg) { return; }
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', irregular(vueltas, escala, semilla)); p.setAttribute('fill', 'none'); p.setAttribute('stroke', '#F5F5F0');
    p.setAttribute('stroke-width', '15'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(p);
  }
  [['esp1', 11, 4.4, 1.7], ['esp2', 8, 6.2, 4.1], ['esp3', 9, 5.2, 2.9]].forEach(function (e) { pintar(e[0], e[1], e[2], e[3]); });
  try {
    if (localStorage.getItem('feminist-sin-efectos') === '1') {
      var f = document.querySelector('.fondo-esp'); if (f) { f.classList.add('quieto'); }
      document.body.classList.add('sin-efectos');
    }
  } catch (e) { /* sin almacenamiento */ }
})();
