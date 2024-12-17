import { createPage } from "../../utils/functions/createPage";
import { fetchData } from "../../utils/api/fetchData";
import { showSuccessMessage, showErrorMessage } from "../../utils/functions/messages";
import "./CreateEvent.css";

export const CreateEvent = () => {
  const page = createPage("create-event"); // Crea un contenedor <div> para la página con el ID "create-event".

  const form = document.createElement("form"); // Creamos el formulario de creación de eventos.
  form.className = "create-event-form";

  // HTML interno del formulario
  form.innerHTML = `
    <h2>Crear Evento</h2>
    <input type="text" name="title" placeholder="Título del Evento" required />
    <textarea name="description" placeholder="Descripción del Evento" required></textarea>
    <input type="text" name="location" placeholder="Ubicación" required />
    <input type="datetime-local" name="date" required />
    <input type="file" name="img" accept="image/*" required />
    <button type="submit">Crear Evento</button>
    <div id="messages"></div>
  `;

  const messagesDiv = form.querySelector("#messages"); // Seleccionamos el contenedor donde se mostrarán los mensajes.

  // Escuchamos el evento de envío del formulario.
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario (recargar la página).
    messagesDiv.innerHTML = ""; // Limpiamos cualquier mensaje previo.

    //! Creamos un objeto FormData para manejar los datos del formulario.
    const formData = new FormData(form); // FormData se utiliza porque incluye la capacidad de enviar archivos.

    try {
      // Hacemos una solicitud POST al endpoint de creación de eventos.
      const response = await fetchData("/api/v1/events", "POST", formData, {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviar el token si es necesario
      });

      // Si la solicitud es exitosa, mostramos un mensaje de éxito.
      showSuccessMessage(messagesDiv, "Evento creado exitosamente.");

      form.reset(); // Reiniciamos el formulario para que quede limpio.

      // Redirigimos al usuario a la página de inicio después de 2 segundos.
      setTimeout(() => window.navigateTo("/inicio"), 2000);
    } catch (error) {
      console.error("Error al crear el evento:", error); // Si hay un error, lo mostramos en la consola y al usuario.

      // Mostramos un mensaje de error utilizando messages.js.
      showErrorMessage(
        messagesDiv,
        error.message || "Hubo un problema al crear el evento."
      );
    }
  });

  page.appendChild(form);  // Añadimos el formulario al contenedor principal de la página.

  return page; // Devolvemos la página completa para que sea renderizada.
};