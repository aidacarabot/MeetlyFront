import { fetchData } from "../../utils/api/fetchData";
import "./EventsCreated.css";

export const EventsCreated = async (parentDiv) => {
  parentDiv.innerHTML = "<p>Cargando tus eventos creados...</p>";

  try {
    const createdEvents = await fetchData("/api/v1/events/created", "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    if (!createdEvents || createdEvents.length === 0) {
      parentDiv.innerHTML = "<p>No has creado ningún evento aún.</p>";
      return;
    }

    const eventsContainer = document.createElement("div");
    eventsContainer.className = "events-container";

    createdEvents.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";

      eventCard.innerHTML = `
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <p><strong>Ubicación:</strong> ${event.location}</p>
        <p><strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}</p>
        <p><strong>Asistentes:</strong> ${event.attendeesCount}</p>
      `;

      eventCard.addEventListener("click", () => {
        const eventSlug = event.title.toLowerCase().replace(/ /g, "-");
        window.navigateTo(`/event/${eventSlug}`);
      });

      eventsContainer.appendChild(eventCard);
    });

    parentDiv.innerHTML = "";
    parentDiv.appendChild(eventsContainer);
  } catch (error) {
    console.error("Error al cargar eventos creados:", error);
    parentDiv.innerHTML = "<p>Error al cargar tus eventos creados. Intenta más tarde.</p>";
  }
};