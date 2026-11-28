/* Página propia de cada mujer: ajusta el tamaño del nombre para que quepa en el cartel
   (lo mismo que hace js/ficha.js con la ficha de la portada). */
(function () {
  var n = document.getElementById('nombreFicha');
  if (!n) { return; }
  // Reduce la letra del nombre hasta que cabe en una línea; si aun así no cabe, lo parte en dos con un mínimo legible
  function ajustar() {
    var t = 2.1; n.style.whiteSpace = 'nowrap'; n.style.fontSize = t + 'rem';
    while (n.scrollWidth > n.clientWidth + 1 && t > 0.95) { t -= 0.05; n.style.fontSize = t + 'rem'; }
    if (n.scrollWidth > n.clientWidth + 1) {
      n.style.whiteSpace = 'normal';
      while ((n.scrollWidth > n.clientWidth + 1 || n.scrollHeight > n.clientHeight + 1) && t > 0.75) { t -= 0.05; n.style.fontSize = t + 'rem'; }
    }
  }
  ajustar();
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(ajustar); }   // otra vez cuando llega la letra del título
  var espera; window.addEventListener('resize', function () { clearTimeout(espera); espera = setTimeout(ajustar, 150); });
})();
