import "./Button.css";

//!
/**
 * Crea un botón reutilizable.
 * @param {string} text - El texto que mostrará el botón.
 * @param {string} className - La clase CSS para estilizar el botón.
 * @param {Function} onClick - La función que se ejecutará al hacer clic en el botón.
 * @param {string} [id] - (Opcional) ID único que se asignará al botón.
 * @returns {HTMLButtonElement} - El botón creado.
 */

export const Button = (text, className, onClick, id) => {
  const button = document.createElement("button"); // Creamos el botón.
  button.className = className || ""; // Asignamos la clase CSS si existe.
  button.textContent = text; // Establecemos el texto del botón.

  if (id) button.id = id; // Asignamos un ID opcional al botón.
  if (onClick) {
    button.addEventListener("click", onClick); // Asignamos la función al evento clic si existe.
  }

  return button; // Devolvemos el botón creado.
};