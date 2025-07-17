//! Función para formatear la fecha
export const formatDate = (dateString) => {
  const options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true // Formato de 12 horas (AM/PM)
  };
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
};