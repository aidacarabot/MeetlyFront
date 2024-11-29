// Importamos fetchData para realizar solicitudes al backend
import { fetchData } from "../../utils/api/fetchData";
import "./Events.css";

// Función para cargar y mostrar eventos en un contenedor específico
export const Events = async (parentDiv, limit) => {
  // Agregamos un encabezado o mensaje introductorio
  const p = document.createElement("p");
  p.textContent = "Echa un vistazo a los eventos actuales...";
  const eventsDiv = document.createElement("div");
  eventsDiv.id = "events";

  parentDiv.append(p); // Agrega el encabezado al contenedor principal
  parentDiv.append(eventsDiv); // Agrega el contenedor para los eventos

  try {
    // Solicitamos todos los eventos al backend
    const allEvents = await fetchData("/api/v1/events");

    // Si no hay eventos, mostramos un mensaje al usuario
    if (!allEvents || allEvents.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No hay eventos disponibles.";
      eventsDiv.append(message);
      return; // Salimos de la función
    }

    // Filtramos o limitamos los eventos si se especifica un límite
    const eventsToShow = limit ? allEvents.slice(0, limit) : allEvents;

    // Iteramos por cada evento y creamos una tarjeta
    eventsToShow.forEach((event) => {
      const eventCard = createEventCard(event);
      eventsDiv.append(eventCard); // Agregamos la tarjeta al contenedor de eventos
    });
  } catch (error) {
    // Si hay un error en la solicitud, mostramos un mensaje al usuario
    console.error("Error al cargar los eventos:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Hubo un error al cargar los eventos. Por favor, intenta más tarde.";
    eventsDiv.append(errorMessage);
  }
};

// Función para crear una tarjeta de evento con los detalles del evento
const createEventCard = (event) => {
  const eventCard = document.createElement("div");
  eventCard.className = "event-card";

  // Imagen del evento
  const img = document.createElement("img");
  img.src = event.img;
  img.alt = event.title;

  // Título del evento
  const title = document.createElement("h2");
  title.className = "event-title";
  title.textContent = event.title;

  // Descripción del evento
  const description = document.createElement("p");
  description.className = "event-description";
  description.textContent = event.description;

  // Ubicación del evento
  const location = document.createElement("p");
  location.innerHTML = `<strong>Ubicación:</strong> ${event.location}`;

  // Fecha del evento
  const date = document.createElement("p");
  date.innerHTML = `<strong>Fecha:</strong> ${new Date(
    event.date
  ).toLocaleString()}`;

  // Nombre del organizador
  const organizer = document.createElement("p");
  organizer.innerHTML = `<strong>Organizador:</strong> ${event.organizer.username}`;

  // Número de asistentes
  const attendeesCount = document.createElement("p");
  attendeesCount.innerHTML = `<strong>Asistentes:</strong> ${event.attendees.length}`;

  // Agregamos todos los elementos a la tarjeta
  eventCard.append(img, title, description, location, date, organizer, attendeesCount);

  return eventCard; // Devolvemos la tarjeta completa
};