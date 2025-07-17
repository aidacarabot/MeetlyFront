import { Button } from "../../components/Button/Button";
import {   showSuccessMessage,showErrorMessage,showTemporarySuccessMessage } from "../../components/Messages/Messages";
import { fetchData } from "../api/fetchData";

export const handleEventActions = (
  selectedEvent,
  user,
  eventDetailsDiv,
  messageDiv
) => {
  const updateAttendeesCount = (change) => {
    const attendeesCountEl = eventDetailsDiv.querySelector(
      '.attendees-count strong'
    );
    if (attendeesCountEl) {
      const currentCount = parseInt(attendeesCountEl.textContent, 10);
      attendeesCountEl.textContent = currentCount + change;
    }
  };

  const isOrganizer = selectedEvent.organizer === user.username;
  let isAttending = selectedEvent.attendees.some(
    (attendee) => attendee === user._id
  );

  if (isOrganizer) {
    const deleteButton = Button('Delete Event', 'btn-delete-event', async () => {
      try {
        await fetchData(`/api/v1/events/${selectedEvent.id}`, 'DELETE', null, {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        showSuccessMessage(messageDiv, 'Evento eliminado exitosamente.');
        setTimeout(() => window.navigateTo('/inicio'), 2000);
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        showErrorMessage(messageDiv, 'Error al eliminar el evento.');
      }
    });
    eventDetailsDiv.appendChild(deleteButton);
  } else {
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

          showTemporarySuccessMessage(
            messageDiv,
            isAttending
              ? 'Te has desinscrito del evento.'
              : 'Te has inscrito al evento.',
            3000
          );

          updateAttendeesCount(isAttending ? -1 : 1);
          isAttending = !isAttending;
          attendButton.textContent = isAttending ? 'Desinscribirse' : 'Inscribirse';
          attendButton.className = isAttending ? 'btn-unsubscribe' : 'btn-subscribe';
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
};