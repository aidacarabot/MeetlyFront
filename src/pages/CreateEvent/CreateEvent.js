import { createPage } from "../../utils/functions/createPage";
import { fetchData } from "../../utils/api/fetchData";
import { showError } from "../../utils/functions/errorHandling";
import "./CreateEvent.css";

export const CreateEvent = () => {
  const page = createPage("create-event");

  const form = document.createElement("form");
  form.className = "create-event-form";

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

  const messagesDiv = form.querySelector("#messages");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messagesDiv.innerHTML = ""; // Limpiar mensajes anteriores

    const formData = new FormData(form); // Crear un FormData para enviar el archivo y datos

    try {
      const response = await fetchData("/api/v1/events", "POST", formData, {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviar el token si es necesario
      });

      // Mostrar mensaje de éxito
      const successMessage = document.createElement("p");
      successMessage.className = "success-message";
      successMessage.textContent = "Evento creado exitosamente.";
      messagesDiv.appendChild(successMessage);

      // Reiniciar formulario
      form.reset();

      // Redirigir a la página de inicio después de unos segundos
      setTimeout(() => window.navigateTo("/inicio"), 2000);
    } catch (error) {
      console.error("Error al crear el evento:", error);

      // Mostrar mensaje de error
      const errorElement = document.createElement("p");
      errorElement.className = "error-message";
      errorElement.textContent =
        error.message || "Hubo un problema al crear el evento.";
      messagesDiv.appendChild(errorElement);
    }
  });

  page.appendChild(form);

  return page;
};