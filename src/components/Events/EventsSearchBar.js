//! Componente que genera una barra de búsqueda para filtrar eventos.
// Se invoca una función callback cuando se detecta entrada en el buscador.

export const EventsSearchBar = (parentDiv, onInput) => {
  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "Buscar eventos...";
  searchBox.className = "events-searchbox";

  // Agrega un evento de entrada (input) para ejecutar el callback proporcionado.
  searchBox.addEventListener("input", (e) => {
    const filterTerm = e.target.value.trim();
    onInput(filterTerm); // Ejecuta la función callback con el término de búsqueda.
  });

  parentDiv.appendChild(searchBox); // Agrega la barra de búsqueda al contenedor principal.
  return searchBox;
};