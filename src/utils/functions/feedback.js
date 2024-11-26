// Muestra un mensaje en un contenedor dado
export const showMessage = (element, message, isError = false) => {
  element.textContent = message; // Asigna el mensaje al contenedor.
  element.className = `message ${isError ? "error-message" : "success-message"}`; // Aplica la clase correspondiente.
  element.style.display = "block"; // Asegura que sea visible.
};