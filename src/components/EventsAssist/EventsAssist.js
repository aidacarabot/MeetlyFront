import { fetchData } from '../../utils/api/fetchData';
import {
  showErrorMessage,
  showInfoMessage,
  clearMessage,
} from '../../components/Messages/Messages';
import { navigateEventPage } from '../../utils/functions/NavigateEventPage';
import { EventCard } from '../EventCard/EventCard';

//! Esta función renderiza los eventos a los que el usuario está inscrito.
export const EventsAssist = async (parentDiv) => {
  //! Crear un contenedor para mensajes (independiente del contenedor de eventos).
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-container';
  parentDiv.appendChild(messageDiv);

  //! Crear un contenedor para los eventos.
  const eventsContainer = document.createElement('div');
  eventsContainer.className = 'events-container-profile';
  parentDiv.appendChild(eventsContainer);

  // Mostrar mensaje de carga inicial.
  showInfoMessage(messageDiv, 'Cargando los eventos a los que estás inscrito...');

  try {
    //! Realizar la solicitud al backend.
    const events = await fetchData('/api/v1/events/attend', 'GET', null, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    //! Si no hay eventos, mostrar mensaje y limpiar el contenedor de eventos.
    if (!events || events.length === 0) {
      eventsContainer.innerHTML = ''; // Asegurarse de que el contenedor esté vacío.
      clearMessage(messageDiv); // Ocultar el mensaje de carga inicial.
      showInfoMessage(messageDiv, 'No estás inscrito en ningún evento.');
      return;
    }

    //! Iterar sobre los eventos obtenidos y crear tarjetas para cada uno.
    eventsContainer.innerHTML = ''; // Limpiar cualquier contenido previo en el contenedor.
    events.forEach((event) => {
      const eventCard = EventCard(event, () => navigateEventPage(event));
      eventsContainer.appendChild(eventCard);
    });

    // Limpiar el mensaje de carga inicial.
    clearMessage(messageDiv);
  } catch (error) {
    console.error('Error al cargar eventos asistidos:', error);
    clearMessage(messageDiv); // Limpiar cualquier mensaje previo
    showErrorMessage(
      messageDiv,
      'Error al cargar los eventos a los que estás inscrito. Intenta más tarde.'
    );
  }
};