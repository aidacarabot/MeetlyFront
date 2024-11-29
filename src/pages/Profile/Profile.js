import { createPage } from "../../utils/functions/createPage";
import { Button } from "../../components/Button/Button"; // Importa el componente reutilizable Button
import { EventsAssist } from "../../components/EventsAssist/EventsAssist"; // Componente para eventos asistidos
import { EventsCreated } from "../../components/EventsCreated/EventsCreated"; // Componente para eventos creados
import "./Profile.css";

export const Profile = () => {
  // Crear el contenedor principal de la página de perfil
  const profileDiv = createPage("profile");

  // **1. Contenedor para los botones:**
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container"; // Clase CSS para estilizar los botones

  // **2. Botón para "Eventos a los que Asistiré":**
  const assistButton = Button(
    "Eventos a los que Asistiré", // Texto del botón
    "btn-assist", // Clase personalizada para el botón
    () => renderSection("assist") // Callback para renderizar la sección de eventos asistidos
  );

  // **3. Botón para "Eventos Creados":**
  const createdButton = Button(
    "Eventos Creados", // Texto del botón
    "btn-created", // Clase personalizada para el botón
    () => renderSection("created") // Callback para renderizar la sección de eventos creados
  );

  // Añadir los botones al contenedor
  buttonContainer.append(assistButton, createdButton);

  // **4. Contenedor para mostrar el contenido dinámico (eventos):**
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container"; // Clase CSS para estilizar el contenedor

  // **5. Función para renderizar las secciones según el botón seleccionado:**
  const renderSection = (section) => {
    contentContainer.innerHTML = ""; // Limpia el contenido previo

    if (section === "assist") {
      // Renderizar los eventos a los que el usuario asistirá
      EventsAssist(contentContainer);
    } else if (section === "created") {
      // Renderizar los eventos creados por el usuario
      EventsCreated(contentContainer); // Asegúrate de que este componente usa la ruta `/api/v1/events/created`
    }
  };

  // Añadir el contenedor de botones y el contenedor de contenido al div principal
  profileDiv.append(buttonContainer, contentContainer);

  // **6. Renderizar automáticamente una sección al cargar la página:**
  renderSection("assist"); // Por defecto, muestra los eventos asistidos al entrar en el perfil

  return profileDiv; // Retorna el contenedor principal
};