// Configuración de Astro para la web Feminist.
// Los idiomas están en una sola lista para que añadir gallego, valenciano
// o euskera más adelante sea solo añadir su código aquí y en src/i18n/.
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    locales: ['es', 'ca', 'en'],
    defaultLocale: 'es',
    routing: {
      // Todas las páginas llevan el idioma en la ruta (/es/, /ca/, /en/)
      prefixDefaultLocale: true,
    },
  },
});
