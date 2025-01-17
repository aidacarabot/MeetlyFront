//! Función para normalizar texto eliminando tildes, diacríticos y caracteres especiales.
export const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos y diacríticos

//! Función para normalizar títulos (remover caracteres especiales y convertir en slugs legibles)
    export const normalizeTitle = (title) => {
      return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    };