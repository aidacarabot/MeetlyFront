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

      let isAttending = selectedEvent.attendees.some(
        (attendee) => attendee === user._id
      );

      // Logs de depuración
      console.log("Usuario actual:", user);
      console.log("Asistentes del evento:", selectedEvent.attendees);
      console.log("¿Está inscrito?:", isAttending);

      const updateAttendeesCount = (change) => {
        const attendeesCountEl = eventDetailsDiv.querySelector(".attendees-count strong");
        if (attendeesCountEl) {
          const currentCount = parseInt(attendeesCountEl.textContent, 10);
          attendeesCountEl.textContent = currentCount + change; // Actualiza dinámicamente
        }
      };

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

            // Mostrar mensaje al usuario.
            showMessage(
              messageDiv,
              isAttending
                ? "Te has desinscrito del evento."
                : "Te has inscrito al evento.",
              false
            );

            // Alternar estado de inscripción
            isAttending = !isAttending;
            attendButton.textContent = isAttending ? "Desinscribirse" : "Inscribirse";
            attendButton.className = isAttending ? "btn-unsubscribe" : "btn-subscribe";

            // Actualizar contador dinámicamente
            updateAttendeesCount(isAttending ? 1 : -1);
          } catch (error) {
            console.error("Error al inscribirse/desinscribirse:", error);
            showMessage(
              messageDiv,
              "Hubo un problema al procesar la solicitud.",
              true
            );
          }
        }
      );

      eventDetailsDiv.appendChild(attendButton);
    } catch (error) {
      console.error("Error al cargar evento:", error);
      showMessage(errorDiv, "Error al cargar el evento.", true);
    }
  };

  loadEventDetails();
  page.appendChild(eventDetailsDiv);
  return page;
};