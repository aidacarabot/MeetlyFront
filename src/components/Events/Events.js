//! Es un componente de nivel superior que maneja una colección de eventos
// Renderiza múltiples EventCard en diferentes formatos (normal o carrusel).

import { fetchData } from "../../utils/api/fetchData";
import { showErrorMessage, clearMessage } from "../../utils/functions/messages";
import { navigateEventPage } from "../../utils/functions/NavigateEventPage";
import { EventCard } from "../EventCard/EventCard";
import "./Events.css";

export const Events = async (parentDiv, options = {}, isCarousel = false) => {
  const {
    endpoint = "/api/v1/events", // Endpoint para cargar los eventos.
    title = "Eventos disponibles:", // Título que se mostrará antes de la lista.
    showSearchBox = true, // Controla si se muestra el buscador.
    showErrors = true, // Controla si se muestran los mensajes de error.
    context = "default", // Nuevo: contexto de renderizado ('hero', 'home').
  } = options;

  //! Crear el título
  const p = document.createElement("p");
  p.textContent = title;

  //! Crear el contenedor de eventos
  const eventsDiv = document.createElement("div");
  eventsDiv.className = isCarousel ? "slider" : "events-container"; // Configura las clases según el modo.
  eventsDiv.style.display = ""; // Aseguramos que no se sobrescriba el estilo del CSS.

  //! Crear el contenedor de mensajes de error si está habilitado
  let errorDiv;
  if (showErrors) {
    errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.display = "none";
    parentDiv.appendChild(errorDiv); // Añadimos el contenedor de error solo si está habilitado.
  }

  //! Crear el buscador si está habilitado
  let searchBox;
  if (showSearchBox) {
    searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "Buscar eventos...";
    searchBox.className = "events-searchbox";
    parentDiv.appendChild(searchBox);
  }

  parentDiv.append(p, eventsDiv); // Añadimos los elementos al contenedor principal.

  let allEvents = []; // Guardaremos todos los eventos aquí.

  //! Normalizar texto para búsquedas
  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  //! Renderizar eventos filtrados
  const renderFilteredEvents = (filterTerm) => {
    if (errorDiv) clearMessage(errorDiv); // Limpia cualquier mensaje de error previo.
    eventsDiv.innerHTML = ""; // Limpia el contenido previo.

    const normalizedFilterTerm = normalizeText(filterTerm);
    const filteredEvents = allEvents.filter((event) => {
      const normalizedTitle = normalizeText(event.title);
      const normalizedDescription = normalizeText(event.description || "");
      const normalizedLocation = normalizeText(event.location);

      return (
        normalizedTitle.includes(normalizedFilterTerm) ||
        normalizedDescription.includes(normalizedFilterTerm) ||
        normalizedLocation.includes(normalizedFilterTerm)
      );
    });

    if (filteredEvents.length === 0) {
      if (errorDiv) showErrorMessage(errorDiv, "No hay eventos que coincidan con tu búsqueda.");
      return;
    }

    if (isCarousel) {
      //! Si es carrusel, construimos las estructuras necesarias
      const slideTrack = document.createElement("div");
      slideTrack.className = "slide-track";

      filteredEvents.forEach((event) => {
        const slide = document.createElement("div");
        slide.className = "slide";

        const eventCard = EventCard(event, null, "event-card-hero"); // Las tarjetas no son clickeables en el Hero.
        slide.appendChild(eventCard);
        slideTrack.appendChild(slide);
      });

      eventsDiv.appendChild(slideTrack); // Agregamos el carrusel al contenedor principal.
    } else {
      //! Si no es carrusel, renderizamos las tarjetas normalmente
      filteredEvents.forEach((event) => {
        const isClickable = context === "home"; // Solo clickeable en Home.
        const eventCardClass = context === "hero" ? "event-card-hero" : "event-card-home";

        const eventCard = EventCard(
          event,
          isClickable ? () => navigateEventPage(event) : null, // Función de clic solo si es clickeable.
          eventCardClass // Clase específica según el contexto.
        );

        eventsDiv.appendChild(eventCard); // Añadimos la tarjeta al contenedor.
      });
    }
  };

  //! Cargar y renderizar eventos iniciales
  try {
    const events = await fetchData(endpoint);
    if (!events || events.length === 0) {
      if (errorDiv) showErrorMessage(errorDiv, "No hay eventos disponibles.");
      return;
    }

    allEvents = events; // Guardar todos los eventos cargados.
    renderFilteredEvents(""); // Renderizar todos los eventos inicialmente.

    //! Evento de búsqueda
    if (searchBox) {
      searchBox.addEventListener("input", (e) => {
        const filterTerm = e.target.value.trim();
        renderFilteredEvents(filterTerm);
      });
    }
  } catch (error) {
    console.error("Error al cargar los eventos:", error);
    if (errorDiv) showErrorMessage(errorDiv, "Hubo un error al cargar los eventos. Intenta más tarde.");
  }
};