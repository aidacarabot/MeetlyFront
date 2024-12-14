import "./Button.css"; // Importamos el archivo CSS para estilizar el botón.

//! Descripción de la función:
/**
 * Crea un botón reutilizable.
 * @param {string} text - El texto que mostrará el botón.
 * @param {string} className - La clase CSS para estilizar el botón.
 * @param {Function} onClick - La función que se ejecutará al hacer clic en el botón.
 * @param {string} [id] - (Opcional) ID único que se asignará al botón.
 * @returns {HTMLButtonElement} - El botón creado.
 */

export const Button = (text, className, onClick, id) => {
  const button = document.createElement("button"); // Creamos un elemento HTML de tipo botón.
  
  button.className = className || ""; 
  // Asignamos la clase CSS proporcionada como parámetro. 
  // Si no se proporciona ninguna clase, se deja como una cadena vacía.

  button.textContent = text; 
  // Establecemos el texto del botón utilizando el parámetro `text`.

  if (id) button.id = id; 
  // Si se proporciona un `id`, lo asignamos al botón. Esto puede ser útil para estilos específicos 
  // o identificación del botón en el DOM.

  if (onClick) {
    button.addEventListener("click", onClick); 
    // Si se proporciona una función `onClick`, se asocia al evento `click` del botón. 
    // Esto permite que el botón ejecute la función cuando el usuario haga clic en él.
  }

  return button; 
  // Retornamos el botón ya configurado, listo para ser insertado en el DOM.
};