import { createPage } from "../../utils/functions/createPage";
import { Button } from "../../components/Button/Button";
import { EventsAssist } from "../../components/EventsAssist/EventsAssist";
import { EventsCreated } from "../../components/EventsCreated/EventsCreated";
import "./Profile.css";

export const Profile = () => {
  const profileDiv = createPage("profile");

  // Contenedor de los botones
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // Botón para "Eventos a los que Asistiré"
  const assistButton = Button(
    "Eventos a los que Asistiré", // Texto del botón
    "btn-assist", // Clase personalizada
    () => renderSection("assist") // Callback para renderizar la sección
  );

  // Botón para "Eventos Creados"
  const createdButton = Button(
    "Eventos Creados", // Texto del botón
    "btn-created", // Clase personalizada
    () => renderSection("created") // Callback para renderizar la sección
  );

  buttonContainer.append(assistButton, createdButton);

  // Contenedor donde se mostrarán los eventos
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";

  // Función para renderizar las secciones
  const renderSection = (section) => {
    contentContainer.innerHTML = ""; // Limpia el contenido previo
    if (section === "assist") {
      EventsAssist(contentContainer); // Renderiza eventos asistidos
    } else if (section === "created") {
      EventsCreated(contentContainer); // Renderiza eventos creados
    }
  };

  profileDiv.append(buttonContainer, contentContainer);

  return profileDiv;
};