//! Es un componente de nivel superior que maneja una colección de eventos
// Renderiza múltiples EventCard en diferentes formatos (normal o carrusel).

import { fetchData } from '../../utils/api/fetchData'
import { showErrorMessage } from '../../components/Messages/Messages'
import { normalizeText } from '../../utils/functions/normalizeText'
import { renderFilteredEvents } from '../../utils/functions/renderFilteredEvents'
import { EventsSearchBar } from './EventsSearchBar'
import './Events.css'

export const Events = async (parentDiv, options = {}, isCarousel = false) => {
  const {
    endpoint = '/api/v1/events', // Endpoint para cargar los eventos.
    title = 'Eventos disponibles:', // Título que se mostrará antes de la lista.
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

  //! Crear contenedor de mensajes de error
  let errorDiv
  if (showErrors) {
    errorDiv = document.createElement('div')
    errorDiv.className = 'error-message'
    errorDiv.style.display = 'none'
    parentDiv.appendChild(errorDiv)
  }

  //! Crear barra de búsqueda (si está habilitada)
  let searchBox
  if (showSearchBox) {
    // Si se especifica un selector, ubicamos el SearchBar después de ese elemento.
    const afterElement = afterElementSelector
      ? parentDiv.querySelector(afterElementSelector)
      : null

    const onInputCallback = (filterTerm) => {
      renderFilteredEvents(eventsDiv, allEvents, filterTerm, {
        context,
        isCarousel,
        errorDiv,
        normalizeText
      })
    }

    if (afterElement) {
      searchBox = EventsSearchBar(afterElement.parentElement, onInputCallback)
      afterElement.insertAdjacentElement('afterend', searchBox) // Insertamos el SearchBar después del botón "Crear Evento".
    } else {
      searchBox = EventsSearchBar(parentDiv, onInputCallback)
      parentDiv.appendChild(searchBox) // En caso de que no haya selector, lo añadimos al final.
    }
  }

  //! Cargar y renderizar eventos iniciales
  let allEvents = []
  try {
    loader.style.display = 'flex' // Aseguramos que el loader sea visible al iniciar la carga

    const events = await fetchData(endpoint)
    if (!events || events.length === 0) {
      if (errorDiv) showErrorMessage(errorDiv, 'No hay eventos disponibles.')
      loader.style.display = 'none' // Ocultamos el loader en caso de error
      return
    }

    allEvents = events // Guardar todos los eventos cargados

    loader.style.display = 'none' // Ocultamos el loader una vez cargados los eventos
    renderFilteredEvents(eventsDiv, allEvents, '', {
      context,
      isCarousel,
      errorDiv,
      normalizeText
    })
  } catch (error) {
    loader.style.display = 'none' // Ocultamos el loader en caso de error
    console.error('Error al cargar los eventos:', error)
    if (errorDiv)
      showErrorMessage(
        errorDiv,
        'Hubo un error al cargar los eventos. Intenta más tarde.'
      )
  }
}