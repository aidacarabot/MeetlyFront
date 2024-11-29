import { fetchData } from "../../utils/api/fetchData";
import "./Events.css";

export const Events = async (parentDiv, options = {}) => {
  const { endpoint = "/api/v1/events", title = "Echa un vistazo a los eventos actuales..." } = options;
  
  console.log("Endpoint utilizado:", endpoint); // Depuración

  const p = document.createElement("p");
  p.textContent = title;
  const eventsDiv = document.createElement("div");
  eventsDiv.id = "events";

  parentDiv.append(p);
  parentDiv.append(eventsDiv);

  try {
    const events = await fetchData(endpoint);
    console.log("Eventos recibidos:", events); // Depuración

    if (!events || events.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No hay eventos disponibles.";
      eventsDiv.append(message);
      return;
    }

    events.forEach((event) => {
      console.log("Renderizando evento:", event); // Depuración
      const eventCard = createEventCard(event);
      eventsDiv.append(eventCard);
    });
  } catch (error) {
    console.error("Error al cargar los eventos:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Hubo un error al cargar los eventos. Por favor, intenta más tarde.";
    eventsDiv.append(errorMessage);
  }
};

const createEventCard = (event) => {
  console.log("Evento a renderizar:", event); // Depuración

  const eventCard = document.createElement("div");
  eventCard.className = "event-card";

  const img = document.createElement("img");
  img.src = event.img;
  img.alt = event.title;

  const title = document.createElement("h2");
  title.className = "event-title";
  title.textContent = event.title;

  const description = document.createElement("p");
  description.className = "event-description";
  description.textContent = event.description;

  const location = document.createElement("p");
  location.innerHTML = `<strong>Ubicación:</strong> ${event.location}`;

  const date = document.createElement("p");
  date.innerHTML = `<strong>Fecha:</strong> ${new Date(
    event.date
  ).toLocaleString()}`;

  const organizer = document.createElement("p");
  organizer.innerHTML = `<strong>Organizador:</strong> ${event.organizer}`;

  const attendeesCount = document.createElement("p");
  attendeesCount.innerHTML = `<strong>Asistentes:</strong> ${event.attendeesCount}`;

  eventCard.append(img, title, description, location, date, organizer, attendeesCount);

  return eventCard;
};