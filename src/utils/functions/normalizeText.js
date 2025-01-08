//! Función para normalizar texto eliminando tildes, diacríticos y caracteres especiales.
export const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos y diacríticos