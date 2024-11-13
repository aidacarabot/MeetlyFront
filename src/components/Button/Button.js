export const Button = (text, className, onClick) => {
  const button = document.createElement("button"); // Creamos el botón
  button.className = className || ""; // Asignamos la clase si existe
  button.textContent = text; // Establecemos el texto del botón

  if (onClick) {
    button.addEventListener("click", onClick); // Asignamos la función onClick si se pasa
  }

  return button; // Devolvemos el botón creado
};