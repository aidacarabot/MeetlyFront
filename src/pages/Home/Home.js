import { createPage } from "../../utils/functions/createPage";
import { Events } from "../../components/Events/Events";
import { Button } from "../../components/Button/Button";
import "./Home.css";

export const Home = () => {
  const homeDiv = createPage("home"); // Crea la página principal para Home

  //! Botón para crear evento usando Button.js
  const createEventButton = Button(
    "Crear Evento", // Texto del botón
    "uiverse-create-event-button", // Clase CSS única
    () => window.navigateTo("/crear-evento"), // Acción al hacer clic
    "", // Sin ID específico
    true, // Usa un <span>
    "uiverse-button-top" // Clase CSS única para el <span>
  );

  homeDiv.appendChild(createEventButton); // Añade el botón a la página

  //! Renderizar eventos con buscador habilitado
  Events(homeDiv, { title: "Eventos disponibles:", showSearchBox: true, context: "home",  afterElementSelector: ".uiverse-create-event-button"  }, false);

  return homeDiv; // Retorna el contenedor principal
};