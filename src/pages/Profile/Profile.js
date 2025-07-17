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

  // **2. Función para manejar el estado activo de los botones:**
  const setActiveButton = (activeButton) => {
    // Quita la clase activa de todos los botones
    document.querySelectorAll(".uiverse-assist-button, .uiverse-created-button").forEach((button) => {
      button.classList.remove("active");
    });
    // Agrega la clase activa al botón seleccionado
    activeButton.classList.add("active");
  };

  // **3. Botón para "Eventos a los que Asistiré":**
  const assistButton = Button(
    'Attending Events', // Texto del botón
    'uiverse-assist-button', // Clase personalizada para el botón
    () => {
      setActiveButton(assistButton) // Marcar este botón como activo
      renderSection('assist') // Callback para renderizar la sección de eventos asistidos
    },
    '', // Sin ID específico
    true, // Usa un <span>
    'uiverse-button-top-assist' // Clase CSS específica para el span del botón
  )

  // **4. Botón para "Eventos Creados":**
  const createdButton = Button(
    "Created Events", // Texto del botón
    "uiverse-created-button", // Clase personalizada para el botón
    () => {
      setActiveButton(createdButton); // Marcar este botón como activo
      renderSection("created"); // Callback para renderizar la sección de eventos creados
    },
    "", // Sin ID específico
    true, // Usa un <span>
    "uiverse-button-top-created" // Clase CSS específica para el span del botón
  );

  // Añadir los botones al contenedor
  buttonContainer.append(assistButton, createdButton);

  // **5. Contenedor para mostrar el contenido dinámico (eventos):**
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container"; // Clase CSS para estilizar el contenedor

  // **6. Función para renderizar las secciones según el botón seleccionado:**
  const renderSection = (section) => {
    contentContainer.innerHTML = ""; // Limpia el contenido previo

    if (section === "assist") {
      EventsAssist(contentContainer); // Renderizar los eventos a los que el usuario asistirá
    } else if (section === "created") {
      EventsCreated(contentContainer); // Renderizar los eventos creados por el usuario
    }
  };

  // **7. Renderizar automáticamente una sección al cargar la página:**
  setActiveButton(assistButton); // Por defecto, activa el botón de "Eventos a los que Asistiré"
  renderSection("assist");

  // Añadir el contenedor de botones y el contenedor de contenido al div principal
  profileDiv.append(buttonContainer, contentContainer);

  return profileDiv; // Retorna el contenedor principal
};