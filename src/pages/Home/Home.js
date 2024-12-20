import { createPage } from "../../utils/functions/createPage";
import { Events } from "../../components/Events/Events";
import { Button } from "../../components/Button/Button";
import "./Home.css";

export const Home = () => {
  const homeDiv = createPage("home");

  // Botón para crear evento usando Button.js
  const createEventButton = Button(
    "Crear Evento", // Texto del botón
    "uiverse-create-event-button", // Clase CSS única
    () => window.navigateTo("/crear-evento"), // Acción al hacer clic
    "", // Sin ID específico
    true, // Usa un <span>
    "uiverse-button-top" // Clase CSS única para el <span>
  );

  homeDiv.appendChild(createEventButton);

  Events(homeDiv); // Usa el componente Events

  return homeDiv;
};