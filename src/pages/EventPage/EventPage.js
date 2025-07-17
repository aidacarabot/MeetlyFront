import { showErrorMessage } from "../../components/Messages/Messages";
import { fetchData } from "../../utils/api/fetchData";
import { createPage } from "../../utils/functions/createPage";
import { handleEventActions } from "../../utils/functions/eventActions";
import { normalizeTitle } from "../../utils/functions/normalizeText";
import { renderEventDetails } from "../../utils/functions/renderEventDetails";
import "./EventPage.css";

export const EventPage = () => {
  const page = createPage('event-page');
  const eventName = normalizeTitle(
    decodeURIComponent(window.location.pathname.split('/').pop())
  );

  const eventDetailsDiv = document.createElement('div');
  eventDetailsDiv.className = 'event-details';

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-container';
  page.appendChild(messageDiv);

  const loadEventDetails = async () => {
    try {
      const events = await fetchData('/api/v1/events');
      const selectedEvent = events.find(
        (e) => normalizeTitle(e.title) === eventName
      );

      if (!selectedEvent) {
        showErrorMessage(messageDiv, 'Evento no encontrado.');
        return;
      }

      eventDetailsDiv.innerHTML = renderEventDetails(selectedEvent);
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user._id) {
        showErrorMessage(messageDiv, 'Usuario no autenticado.');
        return;
      }

      handleEventActions(selectedEvent, user, eventDetailsDiv, messageDiv);
    } catch (error) {
      console.error('Error al cargar evento:', error);
      showErrorMessage(messageDiv, 'Error al cargar el evento.');
    }
  };

  loadEventDetails();
  page.appendChild(eventDetailsDiv);
  return page;
};