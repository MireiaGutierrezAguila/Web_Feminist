/* Espirales irregulares de la parte de abajo (mismas que en las actividades) */
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
  var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', irregular(vueltas, escala, semilla)); p.setAttribute('fill', 'none'); p.setAttribute('stroke', '#F5F5F0');
  p.setAttribute('stroke-width', '15'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
  document.getElementById(id).appendChild(p);
}
  [['bajo1', 10, 4.6, 0.9], ['bajo2', 8, 6.0, 3.3], ['bajo3', 9, 5.2, 5.1], ['bajo4', 11, 4.4, 2.2], ['bajo5', 8, 6.2, 4.4]].forEach(function (e) { pintar(e[0], e[1], e[2], e[3]); });
})();
