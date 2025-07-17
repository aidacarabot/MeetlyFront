//! Es un componente individual que representa la visualización de un evento específico.
// Renderiza la información de un evento (como título, imagen, descripción, ubicación, fecha, asistentes).

import "./EventCard.css";

//! Este componente acepta un objeto `event` que contiene datos del evento, 
// un callback `onClick` para manejar eventos de clic (opcional) y una clase personalizada `customClass`.
export const EventCard = (event, onClick, customClass = "") => {
  const card = document.createElement("div");
  card.className = `event-card ${customClass}`; // Añade la clase personalizada

  // Configuración de la imagen
  const img = document.createElement("img");
  img.src = event.img;
  img.alt = event.title;
  img.className = "event-card-img";

  // Configuración del título
  const title = document.createElement("h2");
  title.textContent = event.title;
  title.className = "event-card-title";

  // Configuración de la ubicación
  const location = document.createElement("p");
  location.innerHTML = `<strong>Ubicación:</strong> ${event.location}`;
  location.className = "event-card-location";

  // Configuración de la fecha
  const date = document.createElement("p");
  date.innerHTML = `<strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}`;
  date.className = "event-card-date";

  // Añade funcionalidad de click si se proporciona
  if (onClick) {
    card.addEventListener("click", onClick);
    card.classList.add("clickable");
  }

  card.append(img, title, location, date);
  return card;
};