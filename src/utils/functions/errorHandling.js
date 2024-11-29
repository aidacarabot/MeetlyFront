
 //! Muestra un mensaje de error en el formulario.
export const showError = (form, field, message) => {
  const errorContainer = form.querySelector("#error-messages");
  if (errorContainer) {
    const errorElement = document.createElement("p");
    errorElement.className = "error-message";
    errorElement.textContent = message;

    if (field !== "general") {
      errorElement.dataset.for = field;
    }

    errorContainer.appendChild(errorElement);
  }
};

 //! Limpia todos los mensajes de error de un formulario.
export const clearErrors = (form) => {
  const errorContainer = form.querySelector("#error-messages");
  if (errorContainer) {
    errorContainer.innerHTML = ""; // Limpia todos los errores.
  }
};

 //! Muestra un mensaje de éxito en el formulario.
export const showSuccessMessage = (form, message) => {
  const successContainer = form.querySelector("#success-message");
  if (successContainer) {
    successContainer.textContent = message;
    successContainer.style.display = "block"; // Muestra el mensaje.
  }
};