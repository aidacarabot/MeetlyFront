//! Muestra un mensaje de error en un contenedor dado
export const showErrorMessage = (container, message) => {
  // Creamos el contenedor si no existe
  if (!container) {
    console.error("El contenedor para mostrar el mensaje no existe.");
    return;
  }

  container.textContent = message; // Asignamos el mensaje
  container.className = "message error-message"; // Aplicamos clase de error
  container.style.display = "block"; // Aseguramos que sea visible
};

//! Muestra un mensaje de éxito en un contenedor dado
export const showSuccessMessage = (container, message) => {
  if (!container) {
    console.error("El contenedor para mostrar el mensaje no existe.");
    return;
  }

  container.textContent = message; // Asignamos el mensaje
  container.className = "message success-message"; // Aplicamos clase de éxito
  container.style.display = "block"; // Aseguramos que sea visible
};

//! Limpia cualquier mensaje mostrado en un contenedor dado
export const clearMessage = (container) => {
  if (!container) {
    console.error("El contenedor para limpiar el mensaje no existe.");
    return;
  }
  container.textContent = ""; // Vaciamos el contenido
  container.className = ""; // Quitamos clases de estilo
  container.style.display = "none"; // Lo ocultamos
};

//! Función para mostrar mensajes informativos.
export const showInfoMessage = (element, message) => {
  element.textContent = message; // Establece el mensaje en el contenedor.
  element.className = "message info-message"; // Aplica una clase específica para mensajes informativos.
  element.style.display = "block"; // Asegura que el mensaje sea visible.
};