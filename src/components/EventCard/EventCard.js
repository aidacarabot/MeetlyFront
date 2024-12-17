//! Es un componente individual que representa la visualización de un evento específico. Renderiza la información de un evento (como título, imagen, descripción, ubicación, fecha, asistentes).

import "./EventCard.css";

//con "event" que recibamos accedemos a todo: img,title, asistentes, etc... y asi creamos las cartas correctamente.
export const EventCard = (event, onClick) => {
  const card = document.createElement("div");   // Creamos el contenedor principal para la tarjeta del evento.
  card.className = "event-card"; //clase css

  //? configurar imagen
  const img = document.createElement("img");
  img.src = event.img; //url de la imagen del evento
  img.alt = event.title; //titulo alt para accesibilidad

  //? configuración título evento
  const title = document.createElement("h2");
  title.textContent = event.title; // Asignamos el título proporcionado por el objeto `event`.

  //? configuración de la descripción
  const description = document.createElement("p");
  description.textContent = event.description; // Asignamos la descripción proporcionada por el objeto `event`.

  //?configuración de la ubicacion del evento
  const location = document.createElement("p");
  location.innerHTML = `<strong>Ubicación:</strong> ${event.location}`; // Formateamos la ubicación con un título en negrita.

  //? configuración de la fecha del evento
  const date = document.createElement("p");
  date.innerHTML = `<strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}`; // Convertimos la fecha del evento a un formato legible.


  // Si se proporciona una función `onClick`, la asignamos al evento `click` de la tarjeta.
  if (onClick) {
    card.addEventListener("click", onClick);// Agregamos un manejador de eventos. Al hacer click, hace una función que le digamos.
    card.classList.add("clickable"); // Añadimos una clase CSS para indicar que la tarjeta es interactiva.
  }

  card.append(img, title, description, location, date ); // Añadimos todos los elementos al contenedor principal de la tarjeta.

  return card;  // Devolvemos la tarjeta completa para ser usada en otro lugar.
};