import { createPage } from "../../utils/functions/createPage";
import { fetchData } from "../../utils/api/fetchData";
import { Button } from "../../components/Button/Button";
import { showMessage } from "../../utils/functions/feedback";
import "./EventPage.css";

export const EventPage = () => {
  const page = createPage("event-page");
  const eventName = window.location.pathname.split("/").pop();

  const eventDetailsDiv = document.createElement("div");
  eventDetailsDiv.className = "event-details";

  const messageDiv = document.createElement("div");
  messageDiv.className = "message-container";
  page.appendChild(messageDiv);

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  page.appendChild(errorDiv);

  const loadEventDetails = async () => {
    try {
      const events = await fetchData("/api/v1/events");
      const selectedEvent = events.find(
        (e) => e.title.toLowerCase().replace(/ /g, "-") === eventName
      );

      if (!selectedEvent) {
        showMessage(errorDiv, "Evento no encontrado.", true);
        return;
      }

      // Renderizamos los detalles del evento
      eventDetailsDiv.innerHTML = `
        <h2>${selectedEvent.title}</h2>
        <img src="${selectedEvent.img}" alt="${selectedEvent.title}" />
        <p><strong>Descripción:</strong> ${selectedEvent.description}</p>
        <p><strong>Ubicación:</strong> ${selectedEvent.location}</p>
        <p class="attendees-count"><strong>${selectedEvent.attendeesCount}</strong> asistentes</p>
      `;

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        showMessage(errorDiv, "Usuario no autenticado.", true);
        return;
      }

      const isOrganizer = selectedEvent.organizer === user.username;
      let isAttending = selectedEvent.attendees.some(
        (attendee) => attendee === user._id
      );

      // Actualiza dinámicamente el número de asistentes
      const updateAttendeesCount = (change) => {
        const attendeesCountEl = eventDetailsDiv.querySelector(".attendees-count strong");
        if (attendeesCountEl) {
          const currentCount = parseInt(attendeesCountEl.textContent, 10);
          attendeesCountEl.textContent = currentCount + change;
        }
      };

      // Mostrar botón de eliminar evento si eres el organizador
      if (isOrganizer) {
        const deleteButton = Button(
          "Eliminar Evento",
          "btn-delete-event",
          async () => {
            try {
              await fetchData(`/api/v1/events/${selectedEvent.id}`, "DELETE", null, {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              });

              showMessage(messageDiv, "Evento eliminado exitosamente.", false);
              setTimeout(() => window.navigateTo("/inicio"), 2000);
            } catch (error) {
              console.error("Error al eliminar el evento:", error);
              showMessage(messageDiv, "Error al eliminar el evento.", true);
            }
          }
        );
        eventDetailsDiv.appendChild(deleteButton);
      } else {
        // Mostrar botón de inscribirse/desinscribirse si no eres el organizador
        const attendButton = Button(
          isAttending ? "Desinscribirse" : "Inscribirse",
          isAttending ? "btn-unsubscribe" : "btn-subscribe",
          async () => {
            try {
              const endpoint = `/api/v1/events/attend/${selectedEvent.id}`;
              const method = isAttending ? "DELETE" : "POST";

              await fetchData(endpoint, method, null, {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              });

              showMessage(
                messageDiv,
                isAttending
                  ? "Te has desinscrito del evento."
                  : "Te has inscrito al evento.",
                false
              );

              isAttending = !isAttending;
              attendButton.textContent = isAttending ? "Desinscribirse" : "Inscribirse";
              attendButton.className = isAttending ? "btn-unsubscribe" : "btn-subscribe";

              updateAttendeesCount(isAttending ? 1 : -1);
            } catch (error) {
              console.error("Error al inscribirse/desinscribirse:", error);
              showMessage(messageDiv, "Hubo un problema al procesar la solicitud.", true);
            }
          }
        );

        eventDetailsDiv.appendChild(attendButton);
      }
    } catch (error) {
      console.error("Error al cargar evento:", error);
      showMessage(errorDiv, "Error al cargar el evento.", true);
    }
  };

  loadEventDetails();
  page.appendChild(eventDetailsDiv);
  return page;
};