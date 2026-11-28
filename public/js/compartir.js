/* Botón «Compartir» de las fichas (idea de Mireia, 28-11-2026). Lo usan la ficha abierta de la portada (js/ficha.js)
   y la página propia de cada mujer (js/ficha-pagina.js).
   - En pantallas táctiles (móvil, tableta) abre el menú de compartir del propio aparato (WhatsApp, Telegram, Instagram…).
   - En el ordenador copia el enlace y avisa con «Enlace copiado». Si el navegador no deja copiar, enseña el enlace para copiarlo a mano.
   Los textos salen de window.TXT (sección «scripts» de src/i18n/). */
(function () {
  var T = window.TXT || {};
  function txt(clave) { return T[clave] !== undefined ? T[clave] : clave; }

  // Muestra un aviso corto junto al botón (se lee también con lector de pantalla: el aviso tiene aria-live)
  function avisar(aviso, texto) {
    if (!aviso) { return; }
    aviso.textContent = texto;
    clearTimeout(aviso._quitar);
    aviso._quitar = setTimeout(function () { aviso.textContent = ''; }, 4000);
  }

  // Copia con el método antiguo (para navegadores sin portapapeles moderno o sin permiso)
  function copiarAntiguo(url) {
    var campo = document.createElement('textarea');
    campo.value = url; campo.setAttribute('readonly', ''); campo.style.position = 'fixed'; campo.style.opacity = '0';
    document.body.appendChild(campo); campo.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    campo.remove();
    return ok;
  }

  function copiar(url, aviso) {
    var hecho = function () { avisar(aviso, txt('enlaceCopiado')); };
    var aMano = function () { if (copiarAntiguo(url)) { hecho(); } else { avisar(aviso, txt('copiaEnlace') + url); } };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(hecho, aMano); } else { aMano(); }
  }

  // url: dirección que se comparte; titulo: nombre que se propone en el menú del móvil; aviso: elemento donde sale «Enlace copiado»
  window.compartirEnlace = function (url, titulo, aviso) {
    var tactil = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (tactil && navigator.share) {
      navigator.share({ title: titulo, url: url }).catch(function (e) {
        // Si la persona cierra el menú no pasa nada; si el menú falla por otro motivo, se copia el enlace
        if (!e || e.name !== 'AbortError') { copiar(url, aviso); }
      });
      return;
    }
    copiar(url, aviso);
  };

  // Crea el botón y su aviso (los usa js/ficha.js en la portada)
  window.botonCompartir = function (url, titulo, nombre) {
    var caja = document.createElement('div'); caja.className = 'fa-compartir';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'btn-compartir';
    b.textContent = txt('compartir'); b.setAttribute('aria-label', txt('compartirAria').replace('{nombre}', nombre));
    var aviso = document.createElement('span'); aviso.className = 'fa-aviso'; aviso.setAttribute('aria-live', 'polite');
    b.addEventListener('click', function () { window.compartirEnlace(url, titulo, aviso); });
    caja.appendChild(b); caja.appendChild(aviso);
    return caja;
  };
})();
