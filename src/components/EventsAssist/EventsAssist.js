import { fetchData } from '../../utils/api/fetchData';
import {
  showNoEventsMessage,
  showInfoMessage,
  clearMessage,
} from '../../components/Messages/Messages';
import { navigateEventPage } from '../../utils/functions/NavigateEventPage';
import { EventCard } from '../EventCard/EventCard';

//! Esta función renderiza los eventos a los que el usuario está inscrito.
export const EventsAssist = async (parentDiv) => {
  //! Crear contenedor para mensajes (si no existe ya).
  let messageDiv = parentDiv.querySelector('.message-container');
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.className = 'message-container';
    parentDiv.appendChild(messageDiv);
  }

  //! Crear contenedor para eventos (si no existe ya).
  let eventsContainer = parentDiv.querySelector('.events-container-profile');
  if (!eventsContainer) {
    eventsContainer = document.createElement('div');
    eventsContainer.className = 'events-container-profile';
    parentDiv.appendChild(eventsContainer);
  }

  // Mostrar mensaje de carga inicial
  showInfoMessage(messageDiv, 'Cargando los eventos a los que estás inscrito...');

  try {
    //! Realizar la solicitud al backend.
    const response = await fetchData('/api/v1/events/attend', 'GET', null, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    //! Si el backend devuelve un mensaje, mostrarlo directamente.
    if (response.message) {
      clearMessage(messageDiv); // Limpia cualquier mensaje previo.
      showNoEventsMessage(messageDiv, response.message);
      eventsContainer.innerHTML = ''; // Limpia el contenedor de eventos.
      return;
    }

    //! Si no hay eventos (respuesta vacía), mostrar mensaje.
    if (!response || response.length === 0) {
      clearMessage(messageDiv); // Limpia cualquier mensaje previo.
      showNoEventsMessage(messageDiv, 'No estás inscrito en ningún evento.');
      eventsContainer.innerHTML = ''; // Limpia el contenedor de eventos.
      return;
    }

    //! Si hay eventos, renderizarlos.
    clearMessage(messageDiv); // Limpia cualquier mensaje previo.
    eventsContainer.innerHTML = ''; // Limpia el contenedor de eventos.
    response.forEach((event) => {
      const eventCard = EventCard(event, () => navigateEventPage(event));
      eventsContainer.appendChild(eventCard);
    });
  } catch (error) {
    console.error('Error al cargar eventos asistidos:', error);

    //! Si ocurre un error, mostrar el mensaje del backend si está disponible.
    const errorMessage = error.message || 'Error al cargar eventos. Intenta más tarde.';
    clearMessage(messageDiv);
    showNoEventsMessage(messageDiv, errorMessage);
  }
};