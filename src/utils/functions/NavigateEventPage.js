//! Función para generar un slug y navegar a la página del evento.

export const navigateEventPage = (event) => {
  if (!event || !event.title) {
    console.error("El evento no tiene un título válido.", event);
    return;
  }

  // Genera el slug a partir del título del evento.
  const eventSlug = event.title.toLowerCase().replace(/ /g, "-"); // Convertimos el título del evento a un slug.Un slug es una parte de una URL que identifica una página específica de una manera legible y amigable para el usuario y los motores de búsqueda. Para redirigir ese evento a su página con el link: https://yourapp.com/event/mi-primer-evento.

  // Navega a la página correspondiente.
  window.navigateTo(`/event/${eventSlug}`);
};