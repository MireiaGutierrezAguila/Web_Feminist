// Textos de interfaz por idioma. Para añadir un idioma (gallego, euskera…) basta con crear
// su archivo .json con las mismas claves y añadirlo a la lista de abajo y a astro.config.mjs.
import es from './es.json';
import ca from './ca.json';
import en from './en.json';

export const idiomas = ['es', 'ca', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

// Nombre de cada idioma escrito en ese mismo idioma (no se traduce: así lo reconoce quien lo habla).
// Lo usa el selector de idioma para los lectores de pantalla.
export const nombreIdioma: Record<string, string> = {
  es: 'Castellano',
  ca: 'Català',
  en: 'English',
};

const textos: Record<string, unknown> = { es, ca, en };

// Busca una clave con puntos ("juego.titulo") dentro de un archivo de idioma
function buscar(archivo: unknown, clave: string): string | undefined {
  let valor: unknown = archivo;
  for (const parte of clave.split('.')) {
    if (valor === null || typeof valor !== 'object') return undefined;
    valor = (valor as Record<string, unknown>)[parte];
  }
  return typeof valor === 'string' ? valor : undefined;
}

// Devuelve una función t('clave') para el idioma pedido. Si al idioma le falta un texto,
// se enseña el castellano (nunca un hueco); si tampoco existe, la propia clave, para verlo enseguida.
export function usarTextos(lang: string) {
  return (clave: string): string =>
    buscar(textos[lang], clave) ?? buscar(textos.es, clave) ?? clave;
}

// Todos los textos de una sección ("scripts"), con el castellano debajo para rellenar lo que falte.
// Se usa para pasar a los scripts del navegador (public/js/) los textos que escriben.
export function seccion(lang: string, nombre: string): Record<string, string> {
  const de = (archivo: unknown) =>
    ((archivo as Record<string, unknown>)?.[nombre] ?? {}) as Record<string, string>;
  return { ...de(textos.es), ...de(textos[lang]) };
}

// Para los datos con un campo por idioma ({ es: '…', ca: '…' }): el idioma pedido o el castellano
export function enIdioma(o: Record<string, string>, lang: string): string {
  return o[lang] ?? o.es;
}
