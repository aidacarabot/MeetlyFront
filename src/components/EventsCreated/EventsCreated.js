import { fetchData } from "../../utils/api/fetchData";
import "./EventsCreated.css";

export const EventsCreated = async (parentDiv) => {
  parentDiv.innerHTML = "<p>Cargando tus eventos creados...</p>";

  try {
    // Realizamos la solicitud al endpoint para obtener los eventos creados por el usuario
    const createdEvents = await fetchData("/api/v1/events/created", "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    // Comprobamos si no hay eventos creados
    if (!createdEvents || createdEvents.length === 0) {
      parentDiv.innerHTML = "<p>No has creado ningún evento aún.</p>";
      return;
    }

    // Creamos un contenedor para mostrar las tarjetas de los eventos
    const eventsContainer = document.createElement("div");
    eventsContainer.className = "events-container";

    // Iteramos sobre los eventos y creamos una tarjeta para cada uno
    createdEvents.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";

      eventCard.innerHTML = `
        <img src="${event.img}" alt="${event.title}" />
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <p><strong>Ubicación:</strong> ${event.location}</p>
        <p><strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}</p>
        <p><strong>Asistentes:</strong> ${event.attendeesCount}</p>
      `;

      eventsContainer.appendChild(eventCard);
    });

    // Limpiamos el mensaje de carga y agregamos el contenedor al DOM
    parentDiv.innerHTML = ""; // Limpia el mensaje de carga
    parentDiv.appendChild(eventsContainer);
  } catch (error) {
    console.error("Error al cargar eventos creados:", error);
    parentDiv.innerHTML = "<p>Error al cargar tus eventos creados. Intenta más tarde.</p>";
  }
};