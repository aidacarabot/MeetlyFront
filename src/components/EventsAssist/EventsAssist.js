import { fetchData } from "../../utils/api/fetchData"; // Importamos la función para realizar solicitudes al backend.
import { showErrorMessage, showInfoMessage } from "../../utils/functions/messages";
import { navigateEventPage } from "../../utils/functions/NavigateEventPage";
import { EventCard } from "../EventCard/EventCard"; // Importamos el componente reutilizable para crear tarjetas de eventos.
import "./EventsAssist.css";

//? Exportamos la función asíncrona `EventsAssist`, que se encarga de renderizar los eventos a los que el usuario está inscrito.
export const EventsAssist = async (parentDiv) => {
  const assistDiv = document.createElement("div"); // Creamos un contenedor para almacenar los eventos asistidos.
  assistDiv.className = "events-assist"; //Le añadimos una clase

  try {
    //! Realizamos una solicitud al backend para obtener la lista de eventos a los que el usuario está inscrito.
    const events = await fetchData("/api/v1/events/attend", "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviamos el token de autenticación almacenado en localStorage. Hay que enviar token porque es solo si estas loggeado.
    });

    //! Si no se encuentran eventos asistidos, mostramos un mensaje al usuario.
    if (!events || events.length === 0) {
      showInfoMessage(assistDiv, "No estás inscrito en ningún evento."); // Usamos la función para mostrar el mensaje.
      parentDiv.appendChild(assistDiv); // Añadimos el contenedor con el mensaje al elemento padre.
      return;
    }

    //! Iteramos sobre los eventos obtenidos para crear una tarjeta para cada uno.
    events.forEach((event) => {
      const eventCard = EventCard(event, () => navigateEventPage(event)); // Usa la nueva función.
      assistDiv.appendChild(eventCard);
    });

    parentDiv.appendChild(assistDiv); // Finalmente, añadimos el contenedor `assistDiv` con todas las tarjetas al elemento padre.
  } catch (error) {
    console.error("Error al cargar eventos asistidos:", error); // Registramos el error en la consola para depuración.
    showErrorMessage(assistDiv, "Error al cargar los eventos."); // Usamos `showErrorMessage` para mostrar el mensaje.
    parentDiv.appendChild(assistDiv); // Añadimos el contenedor con el mensaje de error al elemento padre.
  }
};
