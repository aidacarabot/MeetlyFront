//! Función que maneja la recarga manual de la página al navegar

export const reload = (e, route) => {
    //? 1. Previene el comportamiento predeterminado del enlace.
  // Cuando hacemos clic en un enlace, el navegador normalmente recarga la página.
  // `e.preventDefault()` evita esta recarga predeterminada.
  e.preventDefault(); 

    //? 2. Cambia la URL visible en el navegador sin recargar la página.
  // Usamos `window.history.pushState` para actualizar la URL.
  // - Primer argumento: Representa el estado (aquí no lo usamos, por eso va vacío `""`).
  // - Segundo argumento: Título de la página (también lo dejamos vacío `""`).
  // - Tercer argumento: `route.path` es la nueva URL que queremos mostrar.
  // Esto cambia la URL visible en el navegador sin recargar la página.
  window.history.pushState("", "", route.path); 

  //? 3. Renderiza el contenido de la nueva ruta.
  // Cada ruta en el archivo `routes.js` tiene una propiedad `page`, que es una función
  // que se encarga de generar el contenido dinámico de esa ruta.
  // Aquí llamamos a esa función para mostrar la página correspondiente a la nueva URL.
  route.page(); 
}