import { createPage } from "../../utils/functions/createPage";
import { fetchData } from "../../utils/api/fetchData";
import { Button } from "../../components/Button/Button";
import "./EventPage.css";

console.log("Token:", localStorage.getItem("token"));
console.log("User:", JSON.parse(localStorage.getItem("user")));

export const EventPage = () => {
  const page = createPage("event-page");
  const eventName = window.location.pathname.split("/").pop(); // Obtiene el slug del evento de la URL

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

      // Renderizamos los detalles del evento
      eventDetailsDiv.innerHTML = `
        <h2>${selectedEvent.title}</h2>
        <img src="${selectedEvent.img}" alt="${selectedEvent.title}" />
        <p><strong>Descripción:</strong> ${selectedEvent.description}</p>
        <p><strong>Ubicación:</strong> ${selectedEvent.location}</p>
        <p><strong>Fecha:</strong> ${new Date(selectedEvent.date).toLocaleString()}</p>
        <p><strong>Asistentes:</strong> ${selectedEvent.attendees.length}</p>
      `;

      const user = JSON.parse(localStorage.getItem("user")); // Obtenemos el usuario del localStorage
      if (!user || !user._id) {
        errorDiv.textContent = "Usuario no autenticado.";
        console.error("Usuario en localStorage:", user);
        return;
      }

      let isAttending = selectedEvent.attendees.some(
        (attendee) => attendee === user._id
      );

      // Creamos el botón de inscripción/desinscripción
      const attendButton = Button(
        isAttending ? "Desinscribirse" : "Inscribirse",
        "btn-attend-event",
        async () => {
          try {
            const endpoint = `/api/v1/events/attend/${selectedEvent.id}`;
            const method = isAttending ? "DELETE" : "POST";
      
            await fetchData(endpoint, method, null, {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            });
      
            // Mostrar mensaje al usuario.
            alert(
              isAttending
                ? "Te has desinscrito del evento."
                : "Te has inscrito al evento."
            );
      
            // Actualizar estado y texto del botón dinámicamente.
            isAttending = !isAttending;
            attendButton.textContent = isAttending
              ? "Desinscribirse"
              : "Inscribirse";
      
            // Recargar detalles del evento si es necesario.
            loadEventDetails();
          } catch (error) {
            console.error("Error al inscribirse/desinscribirse:", error);
            errorDiv.textContent = "Hubo un problema al procesar la solicitud.";
          }
        }
      );

      eventDetailsDiv.appendChild(attendButton);
    } catch (error) {
      console.error("Error al cargar evento:", error);
      errorDiv.textContent = "Error al cargar el evento.";
    }
  };

  loadEventDetails();
  page.appendChild(eventDetailsDiv);
  return page;
};