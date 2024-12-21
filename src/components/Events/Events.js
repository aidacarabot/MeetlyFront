//!Es un componente de nivel superior que maneja una colección de eventos y renderiza múltiples EventCard. 
import { fetchData } from "../../utils/api/fetchData";
import { showErrorMessage } from "../../utils/functions/messages";
import { navigateEventPage } from "../../utils/functions/NavigateEventPage";
import { EventCard } from "../EventCard/EventCard";
import "./Events.css";

//? Exportamos una función asíncrona que renderiza una lista de eventos.
// El argumento `isCarousel` activa el modo carrusel si es `true`.
export const Events = async (parentDiv, options = {}, isCarousel = false) => {
  const { endpoint = "/api/v1/events", title = "Eventos disponibles:" } = options;

  const p = document.createElement("p"); // Creamos el título de la sección.
  p.textContent = title;

  const eventsDiv = document.createElement("div");
  eventsDiv.className = isCarousel ? "slider" : "events-container"; // Asignamos una clase según si es carrusel o no.

  parentDiv.append(p, eventsDiv); // Añadimos título y contenedor al elemento padre.

  try {
    const events = await fetchData(endpoint);
    if (!events || events.length === 0) {
      showErrorMessage(eventsDiv, "No hay eventos disponibles.");
      return;
    }

    // Si es carrusel, agrupamos las tarjetas en un `slide-track`.
    const slideTrack = document.createElement("div");
    slideTrack.className = isCarousel ? "slide-track" : "";

    events.forEach((event) => {
      const eventCard = EventCard(event, () => {
        const isAuthenticated = !!localStorage.getItem("token"); // Verificamos si el usuario tiene un token.
    
        if (isAuthenticated) {
          navigateEventPage(event); // Si está autenticado, redirigimos a la página del evento.
        }
      });
    
      if (isCarousel) {
        // Creamos una estructura `slide` para cada tarjeta.
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.appendChild(eventCard);
        slideTrack.appendChild(slide);
      } else {
        eventsDiv.appendChild(eventCard);
      }
    });

    if (isCarousel) {
      eventsDiv.appendChild(slideTrack); // Añadimos el `slide-track` si es carrusel.
    }
  } catch (error) {
    console.error("Error al cargar los eventos:", error);
    showErrorMessage(eventsDiv, "Hubo un error al cargar los eventos. Intenta más tarde.");
  }
};