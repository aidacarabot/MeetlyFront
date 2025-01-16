import { fetchData } from '../../utils/api/fetchData'
import {
  showErrorMessage,
  showInfoMessage
} from '../../components/Messages/Messages'
import { navigateEventPage } from '../../utils/functions/NavigateEventPage'
import { EventCard } from '../EventCard/EventCard'

//! Esta función renderiza los eventos creados por el usuario en un contenedor específico (`parentDiv`).
export const EventsCreated = async (parentDiv) => {
  // Mostramos un mensaje de carga inicial usando `showInfoMessage`.
  showInfoMessage(parentDiv, 'Cargando tus eventos creados...')

  try {
    const createdEvents = await fetchData(
      '/api/v1/events/created',
      'GET',
      null,
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    )
    // Realiza una solicitud GET al endpoint `/api/v1/events/created` para obtener los eventos creados por el usuario.
    // Se envía un token de autorización desde `localStorage` en los headers.

    if (!createdEvents || createdEvents.length === 0) {
      // Verificamos si no hay eventos creados.
      showInfoMessage(parentDiv, 'No has creado ningún evento aún.')
      // Si no hay eventos, mostramos un mensaje al usuario y finalizamos la función.
      return
    }

    //! Creamos un contenedor para organizar y mostrar las tarjetas de eventos.
    const eventsContainer = document.createElement('div')
    eventsContainer.className = 'events-container-profile'

    // Iteramos sobre la lista de eventos creados que obtuvimos del backend.
    createdEvents.forEach((event) => {
      // Usamos el componente `EventCard` para generar una tarjeta visual para cada evento.
      // Le pasamos `navigateEventPage` como función de clic para que el usuario pueda navegar a la página del evento.
      const eventCard = EventCard(event, () => navigateEventPage(event))
      eventsContainer.appendChild(eventCard) // Añadimos la tarjeta al contenedor de eventos.
    })

    parentDiv.innerHTML = '' // Limpiamos el contenido temporal de `parentDiv` (el mensaje de "Cargando...").
    parentDiv.appendChild(eventsContainer) // Añadimos el contenedor con las tarjetas de eventos creados al `parentDiv`.
  } catch (error) {
    console.error('Error al cargar eventos creados:', error) // Registramos el error para depuración.
    showErrorMessage(
      parentDiv,
      'Error al cargar tus eventos creados. Intenta más tarde.'
    ) // Mostramos un mensaje de error al usuario.
  }
}
