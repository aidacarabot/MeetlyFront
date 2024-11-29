import { fetchData } from "../../utils/api/fetchData";
import "./EventsCreated.css";

export const EventsCreated = async (parentDiv) => {
  const createdDiv = document.createElement("div");
  createdDiv.className = "events-created";

  try {
    const events = await fetchData("/api/v1/events", "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    const createdEvents = events.filter(
      (event) => event.organizer === localStorage.getItem("userId")
    );

    if (createdEvents.length === 0) {
      createdDiv.textContent = "No has creado ningún evento.";
      parentDiv.appendChild(createdDiv);
      return;
    }

    createdEvents.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";

      eventCard.innerHTML = `
        <h2>${event.title}</h2>
        <p><strong>Ubicación:</strong> ${event.location}</p>
        <p><strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}</p>
      `;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.className = "btn-delete";
      deleteButton.addEventListener("click", async () => {
        try {
          await fetchData(`/api/v1/events/${event._id}`, "DELETE", null, {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          });
          alert("Evento eliminado.");
          eventCard.remove();
        } catch (error) {
          console.error("Error al eliminar el evento:", error);
        }
      });

      eventCard.appendChild(deleteButton);
      createdDiv.appendChild(eventCard);
    });

    parentDiv.appendChild(createdDiv);
  } catch (error) {
    console.error("Error al cargar eventos creados:", error);
    createdDiv.textContent = "Error al cargar los eventos.";
    parentDiv.appendChild(createdDiv);
  }
};