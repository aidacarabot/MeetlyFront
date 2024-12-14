import { createPage } from "../../utils/functions/createPage";
import { Events } from "../../components/Events/Events";
import { Button } from "../../components/Button/Button";
import "./Home.css";

export const Home = () => {
  const homeDiv = createPage("home");

  // Botón para crear evento
  const createEventButton = Button(
    "Crear Evento",
    "btn-create-event",
    () => window.navigateTo("/crear-evento")
  );

  homeDiv.appendChild(createEventButton);

  Events(homeDiv); // Usa el componente Events

  return homeDiv;
};