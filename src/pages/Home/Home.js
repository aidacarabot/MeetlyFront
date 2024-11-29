import { createPage } from "../../utils/functions/createPage";
import { Events } from "../../components/Events/Events";
import { Button } from "../../components/Button/Button";
import "./Home.css";

// Función para renderizar la página de inicio
export const Home = () => {
  const homeDiv = createPage("home"); // Crea el contenedor principal para Home.

  // Div para el buscador de eventos
  const searchDiv = document.createElement("div");
  searchDiv.className = "div-search";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Buscar eventos por título...";
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

  // Función para cargar y filtrar los eventos
  const loadEvents = async (filter = "") => {
    eventsDiv.innerHTML = ""; // Limpia los eventos antes de cargarlos.
    const allEvents = await Events(eventsDiv); // Carga todos los eventos.

    // Si hay un filtro, muestra solo los eventos que coincidan con el título.
    if (filter) {
      const filteredEvents = Array.from(eventsDiv.children).filter((event) =>
        event.textContent.toLowerCase().includes(filter.toLowerCase())
      );

      eventsDiv.innerHTML = ""; // Limpia el contenedor y muestra los eventos filtrados.
      filteredEvents.forEach((event) => eventsDiv.appendChild(event));
    }
  };

  // Escuchar los cambios en el input de búsqueda
  searchInput.addEventListener("input", (e) => {
    const filter = e.target.value; // Texto del input
    loadEvents(filter); // Filtra los eventos según el texto
  });

  // Cargar eventos al iniciar
  loadEvents();

  return homeDiv; // Devuelve el contenedor principal.
};