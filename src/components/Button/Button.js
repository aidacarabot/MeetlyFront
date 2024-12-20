//! Crea un botón reutilizable con soporte opcional para un span con clase personalizada.
export const Button = (text, className = "", onClick, id = "", useSpan = false, spanClass = "") => {
  const button = document.createElement("button"); // Creamos el botón principal.
  button.className = className; // Añadimos la clase CSS al botón.
  if (id) button.id = id; // Asignamos un ID opcional al botón.

  if (useSpan) {
    // Si `useSpan` es verdadero, añadimos un <span> con una clase personalizada.
    const span = document.createElement("span");
    span.className = spanClass; // Asignamos la clase que pasas como parámetro.
    span.textContent = text; // Insertamos el texto en el span.
    button.appendChild(span); // Insertamos el span en el botón.
  } else {
    // Si no se usa un span, el texto se añade directamente al botón.
    button.textContent = text;
  }

  if (onClick) {
    button.addEventListener("click", onClick); // Asignamos la acción al hacer clic.
  }

  return button; // Retornamos el botón creado.
};