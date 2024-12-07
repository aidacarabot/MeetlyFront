import { createPage } from "../../utils/functions/createPage";
import { fetchData } from "../../utils/api/fetchData";
import { Button } from "../../components/Button/Button";
import "./EventPage.css";

export const EventPage = () => {
  const page = createPage("event-page");
  const eventName = window.location.pathname.split("/").pop(); // Obtén el nombre del evento de la URL

  const eventDetailsDiv = document.createElement("div");
  eventDetailsDiv.className = "event-details";

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  page.appendChild(errorDiv);

  const loadEventDetails = async () => {
    try {
      const events = await fetchData("/api/v1/events"); // Obtiene todos los eventos
      const selectedEvent = events.find(
        (e) => e.title.toLowerCase().replace(/ /g, "-") === eventName
      );

      if (!selectedEvent) {
        errorDiv.textContent = "Evento no encontrado.";
        return;
      }

      eventDetailsDiv.innerHTML = `
        <h2>${selectedEvent.title}</h2>
        <img src="${selectedEvent.img}" alt="${selectedEvent.title}" />
        <p><strong>Descripción:</strong> ${selectedEvent.description}</p>
        <p><strong>Ubicación:</strong> ${selectedEvent.location}</p>
        <p><strong>Fecha:</strong> ${new Date(selectedEvent.date).toLocaleString()}</p>
      `;

      const isAttending = selectedEvent.attendees.includes(localStorage.getItem("userId"));

      const attendButton = Button(
        isAttending ? "Desinscribirse" : "Inscribirse",
        "btn-attend-event",
        async () => {
          try {
            const endpoint = isAttending
              ? `/api/v1/events/attend/${selectedEvent._id}`
              : `/api/v1/events/attend/${selectedEvent._id}`;
            const method = isAttending ? "DELETE" : "POST";
            await fetchData(endpoint, method, null, {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            });
            alert(isAttending ? "Te has desinscrito." : "Te has inscrito.");
            loadEventDetails(); // Recargar datos
          } catch (error) {
            errorDiv.textContent = "Error al procesar la solicitud.";
          }
        }
      );

      eventDetailsDiv.appendChild(attendButton);
    } catch (error) {
      errorDiv.textContent = "Error al cargar el evento.";
    }
  };

  loadEventDetails();
  page.appendChild(eventDetailsDiv);
  return page;
};
