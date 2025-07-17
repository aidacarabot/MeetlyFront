import { EventCard } from '../../components/EventCard/EventCard'
import { EventsCarousel } from '../../components/Events/EventsCarousel'
import {
  clearMessage,
  showErrorMessage
} from '../../components/Messages/Messages'
import { navigateEventPage } from '../../utils/functions/NavigateEventPage'

//! Función que renderiza eventos filtrados según el término de búsqueda.
// Adapta el modo de renderizado según si es un carrusel o una lista normal.
export const renderFilteredEvents = (
  parentDiv,
  events,
  filterTerm,
  options
) => {
  const { context, isCarousel, errorDiv, normalizeText } = options

  // Limpia el contenedor y los mensajes de error antes de renderizar nuevos eventos.
  if (errorDiv) clearMessage(errorDiv)
  parentDiv.innerHTML = ''

  //! Normalizar el término de búsqueda y filtrar eventos según el término.
  const normalizedFilterTerm = normalizeText(filterTerm)
  const filteredEvents = events.filter((event) => {
    const normalizedTitle = normalizeText(event.title)
    const normalizedDescription = normalizeText(event.description || '')
    const normalizedLocation = normalizeText(event.location)

    return (
      normalizedTitle.includes(normalizedFilterTerm) ||
      normalizedDescription.includes(normalizedFilterTerm) ||
      normalizedLocation.includes(normalizedFilterTerm)
    )
  })

  //! Si no hay eventos que coincidan, muestra un mensaje de error.
  if (filteredEvents.length === 0) {
    if (errorDiv)
      showErrorMessage(
        errorDiv,
        'No hay eventos que coincidan con tu búsqueda. Prueba con otra cosa :)'
      )
    return // Salimos de la función si no hay resultados.
  }

  //! Renderizar los eventos como carrusel o lista.
  if (isCarousel) {
    EventsCarousel(parentDiv, filteredEvents) // Renderizamos usando el carrusel.
  } else {
    filteredEvents.forEach((event) => {
      const isClickable = context === 'home' // Determina si las tarjetas son clickeables.
      const eventCardClass =
        context === 'hero' ? 'event-card-hero' : 'event-card-home'

      const eventCard = EventCard(
        event,
        isClickable ? () => navigateEventPage(event) : null, // Navega a la página del evento solo si es clickeable.
        eventCardClass
      )

      parentDiv.appendChild(eventCard) // Agrega la tarjeta al contenedor.
    })
  }
}
