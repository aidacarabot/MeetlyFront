import { fetchData } from "../../utils/api/fetchData"; // Importamos la función para realizar solicitudes al backend.
import { showErrorMessage, showInfoMessage } from "../../utils/functions/messages";
import { navigateEventPage } from "../../utils/functions/NavigateEventPage";
import { EventCard } from "../EventCard/EventCard"; // Importamos el componente reutilizable para crear tarjetas de eventos.
import "./EventsAssist.css";

//! Esta función renderiza los eventos a los que el usuario está inscrito.
export const EventsAssist = async (parentDiv) => {
  // Mostramos un mensaje de carga inicial usando `showInfoMessage`.
  showInfoMessage(parentDiv, "Cargando los eventos a los que estás inscrito...");

  try {
    //! Realizamos una solicitud al backend para obtener la lista de eventos a los que el usuario está inscrito.
    const events = await fetchData("/api/v1/events/attend", "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviamos el token de autenticación almacenado en localStorage.
    });

    //! Verificamos si no hay eventos a los que el usuario esté inscrito.
    if (!events || events.length === 0) {
      showInfoMessage(parentDiv, "No estás inscrito en ningún evento."); // Mostramos un mensaje al usuario.
      return; // Finalizamos la función si no hay eventos.
    }

    //! Creamos un contenedor para organizar y mostrar las tarjetas de eventos.
    const eventsContainer = document.createElement("div");
    eventsContainer.className = "events-container-profile";

    // Iteramos sobre los eventos obtenidos para crear una tarjeta para cada uno.
    events.forEach((event) => {
      const eventCard = EventCard(event, () => navigateEventPage(event)); // Usa la función de navegación para cada tarjeta.
      eventsContainer.appendChild(eventCard); // Añadimos la tarjeta al contenedor.
    });

    parentDiv.innerHTML = ""; // Limpiamos el contenido temporal de `parentDiv` (el mensaje de "Cargando...").
    parentDiv.appendChild(eventsContainer); // Añadimos el contenedor con las tarjetas de eventos al `parentDiv`.
  } catch (error) {
    console.error("Error al cargar eventos asistidos:", error); // Registramos el error para depuración.
    showErrorMessage(parentDiv, "Error al cargar los eventos a los que estás inscrito. Intenta más tarde."); // Mostramos un mensaje de error al usuario.
  }
};