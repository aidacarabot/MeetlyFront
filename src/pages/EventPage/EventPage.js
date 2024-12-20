import { createPage } from "../../utils/functions/createPage";
import { fetchData } from "../../utils/api/fetchData";
import { Button } from "../../components/Button/Button";
import { showSuccessMessage, showErrorMessage } from "../../utils/functions/messages";
import "./EventPage.css";

//! Función para normalizar títulos (remover caracteres especiales y convertir en slugs legibles)
const normalizeTitle = (title) => {
  return title
    .toLowerCase() // Convertimos a minúsculas
    .normalize("NFD") // Descompone caracteres con tildes o diacríticos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos (tildes y acentos)
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres no alfanuméricos excepto guiones y espacios
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .trim(); // Elimina espacios en blanco al inicio y al final
};

export const EventPage = () => {
  //! Creamos un contenedor para la página
  const page = createPage("event-page");

  //! Obtenemos el nombre del evento desde la URL y lo normalizamos
  const eventName = normalizeTitle(
    decodeURIComponent(window.location.pathname.split("/").pop()) // Decodifica caracteres especiales de la URL
  );

  //! Creamos un div donde se mostrarán los detalles del evento (título, imagen, etc.)
  const eventDetailsDiv = document.createElement("div");
  eventDetailsDiv.className = "event-details";

  //! Creamos un contenedor donde se mostrarán mensajes generales (éxito o error)
  const messageDiv = document.createElement("div");
  messageDiv.className = "message-container";
  page.appendChild(messageDiv); // Añadimos el contenedor de mensajes al contenedor principal de la página

  //! Función para cargar y mostrar los detalles del evento seleccionado
  const loadEventDetails = async () => {
    try {
      // Hacemos una solicitud al backend para obtener todos los eventos disponibles
      const events = await fetchData("/api/v1/events");

      //! Normalizamos los títulos de los eventos para comparar con el título desde la URL
      const normalizedEvents = events.map((e) => ({
        ...e,
        normalizedTitle: normalizeTitle(e.title), // Añadimos una propiedad para el título normalizado
      }));

      // Log para depuración (verificación de títulos)
      console.log("Título desde la URL (normalizado):", eventName);
      console.log(
        "Títulos de eventos cargados:",
        normalizedEvents.map((e) => e.normalizedTitle)
      );

      //! Buscamos el evento específico cuyo título coincida con el nombre en la URL
      const selectedEvent = normalizedEvents.find(
        (e) => e.normalizedTitle === eventName // Comparación usando el título normalizado
      );

      //! Si no encontramos el evento, mostramos un mensaje de error
      if (!selectedEvent) {
        showErrorMessage(messageDiv, "Evento no encontrado.");
        return;
      }

      //! Renderizamos los detalles del evento
      eventDetailsDiv.innerHTML = `
        <h2>${selectedEvent.title}</h2>
        <img src="${selectedEvent.img}" alt="${selectedEvent.title}" />
        <p><strong>Descripción:</strong> ${selectedEvent.description}</p>
        <p><strong>Ubicación:</strong> ${selectedEvent.location}</p>
        <p class="attendees-count"><strong>${selectedEvent.attendeesCount}</strong> asistentes</p>
        <p><strong>Organizado por:</strong> ${selectedEvent.organizer}</p>
      `;

      //! Obtenemos la información del usuario autenticado desde `localStorage`
      const user = JSON.parse(localStorage.getItem("user"));

      //! Verificamos si el usuario está autenticado
      if (!user || !user._id) {
        showErrorMessage(messageDiv, "Usuario no autenticado.");
        return;
      }

      //! Verificamos si el usuario es el organizador del evento
      const isOrganizer = selectedEvent.organizer === user.username;

      //! Verificamos si el usuario está actualmente inscrito en el evento
      let isAttending = selectedEvent.attendees.some(
        (attendee) => attendee === user._id
      );

      //! Función para actualizar dinámicamente el contador de asistentes del evento
      const updateAttendeesCount = (change) => {
        const attendeesCountEl = eventDetailsDiv.querySelector(".attendees-count strong");
        if (attendeesCountEl) {
          const currentCount = parseInt(attendeesCountEl.textContent, 10); // Obtenemos el número actual
          attendeesCountEl.textContent = currentCount + change; // Actualizamos el número de asistentes
        }
      };

      //! Si el usuario es el organizador, mostramos un botón para eliminar el evento
      if (isOrganizer) {
        const deleteButton = Button(
          "Eliminar Evento",
          "btn-delete-event",
          async () => {
            try {
              //! Hacemos una solicitud al backend para eliminar el evento
              await fetchData(`/api/v1/events/${selectedEvent.id}`, "DELETE", null, {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              });

              //! Mostramos un mensaje de éxito al eliminar el evento
              showSuccessMessage(messageDiv, "Evento eliminado exitosamente.");
              setTimeout(() => window.navigateTo("/inicio"), 2000); // Redirigimos al usuario a la página de inicio
            } catch (error) {
              console.error("Error al eliminar el evento:", error);
              showErrorMessage(messageDiv, "Error al eliminar el evento.");
            }
          }
        );
        eventDetailsDiv.appendChild(deleteButton); // Añadimos el botón al contenedor de detalles del evento
      } else {
        //! Si no es el organizador, mostramos un botón para inscribirse o desinscribirse del evento
        const attendButton = Button(
          isAttending ? "Desinscribirse" : "Inscribirse", // Cambiamos el texto según el estado
          isAttending ? "btn-unsubscribe" : "btn-subscribe", // Cambiamos la clase CSS según el estado
          async () => {
            try {
              //! Definimos la URL y el método según la acción (inscribirse o desinscribirse)
              const endpoint = `/api/v1/events/attend/${selectedEvent.id}`;
              const method = isAttending ? "DELETE" : "POST";

              //! Hacemos la solicitud al backend
              await fetchData(endpoint, method, null, {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              });

              //! Mostramos un mensaje dinámico según la acción realizada
              showSuccessMessage(
                messageDiv,
                isAttending
                  ? "Te has desinscrito del evento."
                  : "Te has inscrito al evento."
              );

              //! Actualizamos el estado de asistencia
              isAttending = !isAttending; 
              attendButton.textContent = isAttending ? "Desinscribirse" : "Inscribirse";
              attendButton.className = isAttending ? "btn-unsubscribe" : "btn-subscribe";

              //! Actualizamos el contador de asistentes
              updateAttendeesCount(isAttending ? 1 : -1);
            } catch (error) {
              console.error("Error al inscribirse/desinscribirse:", error);
              showErrorMessage(messageDiv, "Hubo un problema al procesar la solicitud.");
            }
          }
        );

        eventDetailsDiv.appendChild(attendButton); // Añadimos el botón al contenedor de detalles
      }
    } catch (error) {
      console.error("Error al cargar evento:", error); // Log para depuración
      showErrorMessage(messageDiv, "Error al cargar el evento."); // Mensaje de error general
    }
  };

  loadEventDetails(); // Llamamos a la función para cargar los detalles del evento al inicializar la página
  page.appendChild(eventDetailsDiv); // Añadimos el contenedor de detalles al contenedor principal
  return page; // Devolvemos la página para que sea renderizada
};