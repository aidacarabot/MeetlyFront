import { createPage } from '../../utils/functions/createPage';
import { fetchData } from '../../utils/api/fetchData';
import { Button } from '../../components/Button/Button';
import {
  showSuccessMessage,
  showErrorMessage,
  showTemporarySuccessMessage
} from '../../components/Messages/Messages';
import { formatDate } from '../../utils/functions/formatDate';
import './EventPage.css';

//! Función para normalizar títulos (remover caracteres especiales y convertir en slugs legibles)
const normalizeTitle = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

export const EventPage = () => {
  //! Creamos un contenedor para la página
  const page = createPage('event-page');

  //! Obtenemos el nombre del evento desde la URL y lo normalizamos
  const eventName = normalizeTitle(
    decodeURIComponent(window.location.pathname.split('/').pop())
  );

  //! Creamos un div donde se mostrarán los detalles del evento
  const eventDetailsDiv = document.createElement('div');
  eventDetailsDiv.className = 'event-details';

  //! Creamos un contenedor donde se mostrarán mensajes generales (éxito o error)
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-container';
  page.appendChild(messageDiv);

  //! Función para cargar y mostrar los detalles del evento seleccionado
  const loadEventDetails = async () => {
    try {
      // Hacemos una solicitud al backend para obtener todos los eventos disponibles
      const events = await fetchData('/api/v1/events');

      //! Normalizamos los títulos de los eventos
      const normalizedEvents = events.map((e) => ({
        ...e,
        normalizedTitle: normalizeTitle(e.title),
      }));

      //! Buscamos el evento específico
      const selectedEvent = normalizedEvents.find(
        (e) => e.normalizedTitle === eventName
      );

      if (!selectedEvent) {
        showErrorMessage(messageDiv, 'Evento no encontrado.');
        return;
      }

      //! Renderizamos los detalles del evento
      eventDetailsDiv.innerHTML = `
      <div class="allDetails-eventPg">
      <div class="mainDetails-eventPg">
        <h2 class="eventPg-title">${selectedEvent.title}</h2>
        <p class="eventPg-organizer"><strong>Organizado por:</strong> ${
          selectedEvent.organizer
        }</p>
        <img class="eventPg-img" src="${selectedEvent.img}" alt="${
        selectedEvent.title
      }" />
        <p class="eventPg-description"><strong>Descripción:</strong> ${
          selectedEvent.description
        }</p>
      </div>
      <div class="secondDetails-eventPg">
        <p class="eventPg-date"><strong>Fecha:</strong> ${formatDate(
          selectedEvent.date
        )}</p>
        <p class="eventPg-location"><strong>Ubicación:</strong> ${
          selectedEvent.location
        }</p>
      </div>
      </div>
      <p class="attendees-count"><strong>${
        selectedEvent.attendeesCount
      } Asistentes</strong></p>
    `;

      //! Obtenemos la información del usuario autenticado desde `localStorage`
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user._id) {
        showErrorMessage(messageDiv, 'Usuario no autenticado.');
        return;
      }

      //! Verificamos si el usuario es el organizador
      const isOrganizer = selectedEvent.organizer === user.username;

      //! Verificamos si el usuario está inscrito
      let isAttending = selectedEvent.attendees.some(
        (attendee) => attendee === user._id
      );

      //! Función para actualizar el contador de asistentes
      const updateAttendeesCount = (change) => {
        const attendeesCountEl = eventDetailsDiv.querySelector(
          '.attendees-count strong'
        );
        if (attendeesCountEl) {
          const currentCount = parseInt(attendeesCountEl.textContent, 10);
          attendeesCountEl.textContent = currentCount + change;
        }
      };

      if (isOrganizer) {
        //! Botón para eliminar evento
        const deleteButton = Button(
          'Eliminar Evento',
          'btn-delete-event',
          async () => {
            try {
              await fetchData(
                `/api/v1/events/${selectedEvent.id}`,
                'DELETE',
                null,
                {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
              );

              //! Mostramos mensaje de éxito y redirigimos tras 2 segundos
              showSuccessMessage(messageDiv, 'Evento eliminado exitosamente.');
              setTimeout(() => window.navigateTo('/inicio'), 2000);
            } catch (error) {
              console.error('Error al eliminar el evento:', error);
              showErrorMessage(messageDiv, 'Error al eliminar el evento.');
            }
          }
        );
        eventDetailsDiv.appendChild(deleteButton);
      } else {
        //! Botón para inscribirse/desinscribirse
        const attendButton = Button(
          isAttending ? 'Desinscribirse' : 'Inscribirse',
          isAttending ? 'btn-unsubscribe' : 'btn-subscribe',
          async () => {
            try {
              const endpoint = `/api/v1/events/attend/${selectedEvent.id}`;
              const method = isAttending ? 'DELETE' : 'POST';
        
              await fetchData(endpoint, method, null, {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              });
        
              //! Mostrar mensaje de éxito sin loader y redirigir tras 3 segundos
              showTemporarySuccessMessage(
                messageDiv,
                isAttending
                  ? 'Te has desinscrito del evento.'
                  : 'Te has inscrito al evento.',
                3000 // Duración del mensaje en milisegundos
              );
        
              //! Actualizar el contador de asistentes
              updateAttendeesCount(isAttending ? -1 : 1);
              isAttending = !isAttending; // Cambiar estado de asistencia
              attendButton.textContent = isAttending
                ? 'Desinscribirse'
                : 'Inscribirse'; // Actualizar texto del botón
              attendButton.className = isAttending
                ? 'btn-unsubscribe'
                : 'btn-subscribe'; // Actualizar clase del botón
            } catch (error) {
              console.error('Error al inscribirse/desinscribirse:', error);
              showErrorMessage(
                messageDiv,
                'Hubo un problema al procesar la solicitud.'
              );
            }
          }
        );

        eventDetailsDiv.appendChild(attendButton);
      }
    } catch (error) {
      console.error('Error al cargar evento:', error);
      showErrorMessage(messageDiv, 'Error al cargar el evento.');
    }
  };

  loadEventDetails();
  page.appendChild(eventDetailsDiv);
  return page;
};