//llamamos al backend para GET all Events

import { fetchData } from "../../utils/api/fetchData";
import "./Events.css";

export const Events = async (parentDiv, limit) => {
  const p = document.createElement("p");
  p.textContent = "Echa un vistazo a los eventos actuales...";
  const eventsDiv = document.createElement("div");
  eventsDiv.id = "events";

  parentDiv.append(p);
  parentDiv.append(eventsDiv);

  try {
    const allEvents = await fetchData("/api/v1/events");

    if (!allEvents || allEvents.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No hay eventos disponibles.";
      eventsDiv.append(message);
      return;
    }

    // Si se proporciona un límite, usamos slice para obtener solo ese número de eventos
    // Si no, usamos todos los eventos
    const eventsToShow = limit ? allEvents.slice(0, limit) : allEvents;

    eventsToShow.forEach((event) => {
      const eventCard = createEventCard(event);
      eventsDiv.append(eventCard);
    });

  } catch (error) {
    console.error("Error al cargar los eventos:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Hubo un error al cargar los eventos. Por favor, intenta más tarde.";
    eventsDiv.append(errorMessage);
  }
};

const createEventCard = (event) => {
  const eventCard = document.createElement("div");
  eventCard.className = "event-card";

  const img = document.createElement("img");
  img.src = event.img;
  img.alt = event.title;

  const title = document.createElement("h2");
  title.textContent = event.title;

  const description = document.createElement("p");
  description.textContent = event.description;

  const location = document.createElement("p");
  location.innerHTML = `<strong>Ubicación:</strong> ${event.location}`;

  const date = document.createElement("p");
  date.innerHTML = `<strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}`;

  eventCard.append(img, title, description, location, date);

  return eventCard;
};