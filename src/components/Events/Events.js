import { fetchData } from "../../utils/api/fetchData"; // Importamos fetchData
import "./Events.css"; // Estilos de las tarjetas

export const Events = async (parentDiv) => {
  const p = document.createElement("p");
  p.textContent = "Echa un vistazo a los eventos actuales...";
  const eventsDiv = document.createElement("div"); // Creamos el contenedor de eventos
  eventsDiv.id = "events"; // Asignamos ID para estilos

  parentDiv.append(p);
  parentDiv.append(eventsDiv); // Añadimos eventsDiv al contenedor recibido

  // Llamada al endpoint para obtener los eventos
  const events = await fetchData("/api/v1/events");

  if (!events || events.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No hay eventos disponibles.";
    eventsDiv.append(message);
    return;
  }

  // Crear y añadir las tarjetas para cada evento
  events.forEach((event) => {
    const eventCard = createEventCard(event); // Creamos una tarjeta por evento
    eventsDiv.append(eventCard); // Añadimos cada tarjeta al contenedor
  });
};

// Función para crear una tarjeta de evento
const createEventCard = (event) => {
  const eventCard = document.createElement("div");
  eventCard.className = "event-card"; // Clase para CSS

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

  // Añadimos todos los elementos a la tarjeta
  eventCard.append(img, title, description, location, date);

  return eventCard; // Devolvemos la tarjeta del evento
};