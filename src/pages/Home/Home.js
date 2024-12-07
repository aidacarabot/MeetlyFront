import { createPage } from "../../utils/functions/createPage";
import { fetchData } from "../../utils/api/fetchData";
import { Button } from "../../components/Button/Button";
import "./Home.css";

// Función para renderizar la página de inicio
export const Home = () => {
  const homeDiv = createPage("home"); // Contenedor principal para Home.

  // Div para el buscador de eventos
  const searchDiv = document.createElement("div");
  searchDiv.className = "div-search";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Buscar eventos por título o descripción...";
  searchInput.className = "search-input";

  searchDiv.appendChild(searchInput);
  homeDiv.appendChild(searchDiv);

  // Div para el botón de creación de eventos
  const createEventDiv = document.createElement("div");
  createEventDiv.className = "create-event-div";

  const createEventButton = Button(
    "Crear Evento", // Texto del botón
    "btn-create-event", // Clase CSS
    () => window.navigateTo("/crear-evento") // Navegar a la página de creación de eventos
  );

  createEventDiv.appendChild(createEventButton);
  homeDiv.appendChild(createEventDiv);

  // Div para mostrar los eventos
  const eventsDiv = document.createElement("div");
  eventsDiv.className = "events-container";
  homeDiv.appendChild(eventsDiv);

  let allEvents = []; // Almacén para todos los eventos cargados

  // Función para cargar eventos desde la API
  const loadEventsFromAPI = async () => {
    try {
      const events = await fetchData("/api/v1/events");
      allEvents = events || []; // Almacena todos los eventos
      renderEvents(); // Renderiza eventos después de cargarlos
    } catch (error) {
      console.error("Error al cargar eventos:", error);
      eventsDiv.innerHTML = "<p>Hubo un error al cargar los eventos.</p>";
    }
  };

  // Función para renderizar los eventos
  const renderEvents = (filter = "") => {
    eventsDiv.innerHTML = ""; // Limpia los eventos antes de renderizar

    // Filtra los eventos según el título o la descripción
    const filteredEvents = allEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(filter.toLowerCase()) || // Coincidencia en el título
        event.description.toLowerCase().includes(filter.toLowerCase()) // Coincidencia en la descripción
    );

    if (filteredEvents.length === 0) {
      // Si no hay eventos, muestra un mensaje
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "No se encontraron eventos.";
      eventsDiv.appendChild(noResultsMessage);
      return;
    }

    // Renderiza las tarjetas de los eventos filtrados
    filteredEvents.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";

      eventCard.innerHTML = `
        <img src="${event.img}" alt="${event.title}" />
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <p><strong>Ubicación:</strong> ${event.location}</p>
        <p><strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}</p>
      `;

      eventCard.addEventListener("click", () => {
        const eventSlug = event.title.toLowerCase().replace(/ /g, "-"); // Convierte el título a un slug
        window.navigateTo(`/event/${eventSlug}`); // Redirige a la página del evento
      });

      eventsDiv.appendChild(eventCard);
    });
  };

  // Escucha los cambios en el input de búsqueda
  searchInput.addEventListener("input", (e) => {
    const filter = e.target.value; // Obtiene el texto del input
    renderEvents(filter); // Filtra y renderiza los eventos
  });

  // Cargar eventos al iniciar
  loadEventsFromAPI();

  return homeDiv; // Devuelve el contenedor principal
};
