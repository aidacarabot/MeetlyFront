//! Componente que genera una barra de búsqueda para filtrar eventos.
// Incluye un icono SVG decorativo y un campo de búsqueda personalizado.

export const EventsSearchBar = (parentDiv, onInput) => {
  //! Crear el contenedor principal del SearchBar
  const searchBarGroup = document.createElement("div");
  searchBarGroup.className = "events-search-group"; // Clase única para el contenedor.

  //! Crear el icono de búsqueda
  const searchIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  searchIcon.setAttribute("viewBox", "0 0 24 24");
  searchIcon.setAttribute("aria-hidden", "true");
  searchIcon.classList.add("events-search-icon");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
  );
  searchIcon.appendChild(path);

  //! Crear el campo de entrada de búsqueda
  const input = document.createElement("input");
  input.id = "events-search-query"; // ID único para el input.
  input.className = "events-search-input"; // Clase única para el input.
  input.type = "search";
  input.placeholder = "Buscar eventos...";

  //! Añadir evento para manejar cambios en el input
  input.addEventListener("input", (e) => {
    const query = e.target.value.trim(); // Obtener el valor del input.
    onInput(query); // Llamar a la función de búsqueda proporcionada.
  });

  //! Añadir el icono y el input al contenedor
  searchBarGroup.appendChild(searchIcon);
  searchBarGroup.appendChild(input);

  //! Retornar el SearchBar
  return searchBarGroup;
};