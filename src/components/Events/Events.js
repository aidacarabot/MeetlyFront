//! Es un componente de nivel superior que maneja una colección de eventos
// Renderiza múltiples EventCard en diferentes formatos (normal o carrusel).

import { fetchData } from '../../utils/api/fetchData'
import {
  showErrorMessage,
  showNoEventsMessage,
} from '../../components/Messages/Messages'
import { normalizeText } from '../../utils/functions/normalizeText'
import { renderFilteredEvents } from '../../utils/functions/renderFilteredEvents'
import { EventsSearchBar } from './EventsSearchBar'
import './Events.css'

export const Events = async (parentDiv, options = {}, isCarousel = false) => {
  const {
    endpoint = '/api/v1/events', // Endpoint para cargar los eventos.
    title = 'Available Events:', // Título que se mostrará antes de la lista.
    showSearchBox = true, // Controla si se muestra el buscador.
    showErrors = true, // Controla si se muestran los mensajes de error.
    context = 'default', // Contexto de renderizado ('hero', 'home').
    afterElementSelector = null // Selector para colocar el SearchBar después de un elemento específico.
  } = options

  //! Crear el título del contenedor
  const titleElement = document.createElement('p')
  titleElement.textContent = title
  parentDiv.appendChild(titleElement)

  //! Crear el contenedor de eventos
  const eventsDiv = document.createElement('div')
  eventsDiv.className = isCarousel ? 'slider' : 'events-container'
  parentDiv.appendChild(eventsDiv)

  //! Crear el loader dentro de eventsDiv
  const loader = document.createElement('div')
  loader.className = 'dot-spinner'
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement('div')
    dot.className = 'dot-spinner__dot'
    loader.appendChild(dot)
  }
  eventsDiv.appendChild(loader) // Añadimos el loader al contenedor de eventos

  //! Crear contenedor de mensajes
  const messageDiv = document.createElement('div')
  messageDiv.className = 'message-container'
  parentDiv.appendChild(messageDiv)

  //! Crear barra de búsqueda (si está habilitada)
  let searchBox
  if (showSearchBox) {
    const afterElement = afterElementSelector
      ? parentDiv.querySelector(afterElementSelector)
      : null

    const onInputCallback = (filterTerm) => {
      renderFilteredEvents(eventsDiv, allEvents, filterTerm, {
        context,
        isCarousel,
        errorDiv: messageDiv,
        normalizeText,
      })
    }

    if (afterElement) {
      searchBox = EventsSearchBar(afterElement.parentElement, onInputCallback)
      afterElement.insertAdjacentElement('afterend', searchBox)
    } else {
      searchBox = EventsSearchBar(parentDiv, onInputCallback)
      parentDiv.appendChild(searchBox)
    }
  }

  //! Cargar y renderizar eventos iniciales
  let allEvents = []
  try {
    loader.style.display = 'flex' // Mostrar loader al iniciar la carga

    const events = await fetchData(endpoint)
    loader.style.display = 'none' // Ocultar loader tras recibir respuesta

    //! Si no hay eventos, mostrar mensaje "No hay eventos"
    if (!events || events.length === 0) {
      showNoEventsMessage(messageDiv, 'No hay eventos. Agrega algunos.')
      return
    }

    allEvents = events

    renderFilteredEvents(eventsDiv, allEvents, '', {
      context,
      isCarousel,
      errorDiv: messageDiv,
      normalizeText,
    })
  } catch (error) {
    loader.style.display = 'none' // Ocultar loader en caso de error
    console.error('Error al cargar los eventos:', error)
    showErrorMessage(
      messageDiv,
      'Hubo un error al cargar los eventos. Intenta más tarde.'
    )
  }
}