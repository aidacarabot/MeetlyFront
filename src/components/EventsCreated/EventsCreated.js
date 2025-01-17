import { fetchData } from '../../utils/api/fetchData';
import {
  showErrorMessage,
  showInfoMessage,
  clearMessage,
} from '../../components/Messages/Messages';
import { navigateEventPage } from '../../utils/functions/NavigateEventPage';
import { EventCard } from '../EventCard/EventCard';

//! Esta función renderiza los eventos creados por el usuario.
export const EventsCreated = async (parentDiv) => {
  //! Crear un contenedor para mensajes (independiente del contenedor de eventos).
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-container';
  parentDiv.appendChild(messageDiv);

  //! Crear un contenedor para los eventos.
  const eventsContainer = document.createElement('div');
  eventsContainer.className = 'events-container-profile';
  parentDiv.appendChild(eventsContainer);

  // Mostrar mensaje de carga inicial.
  showInfoMessage(messageDiv, 'Cargando tus eventos creados...');

  try {
    //! Realizar la solicitud al backend.
    const createdEvents = await fetchData('/api/v1/events/created', 'GET', null, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    //! Si no hay eventos creados, mostrar mensaje y limpiar el contenedor de eventos.
    if (!createdEvents || createdEvents.length === 0) {
      eventsContainer.innerHTML = ''; // Asegurarse de que el contenedor esté vacío.
      clearMessage(messageDiv); // Ocultar el mensaje de carga inicial.
      showInfoMessage(messageDiv, 'No has creado ningún evento aún.');
      return;
    }

    //! Iterar sobre los eventos obtenidos y crear tarjetas para cada uno.
    eventsContainer.innerHTML = ''; // Limpiar cualquier contenido previo en el contenedor.
    createdEvents.forEach((event) => {
      const eventCard = EventCard(event, () => navigateEventPage(event));
      eventsContainer.appendChild(eventCard);
    });

    // Limpiar el mensaje de carga inicial.
    clearMessage(messageDiv);
  } catch (error) {
    console.error('Error al cargar eventos creados:', error);
    clearMessage(messageDiv); // Limpiar cualquier mensaje previo
    showErrorMessage(
      messageDiv,
      'Error al cargar tus eventos creados. Intenta más tarde.'
    );
  }
};