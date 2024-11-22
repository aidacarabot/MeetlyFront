// Función que maneja la recarga manual de la página al navegar
export const reload = (e, route) => {
  // Previene el comportamiento predeterminado del enlace (recargar la página automáticamente)
  e.preventDefault(); 

  // Cambia la URL en el historial del navegador sin recargar la página
  window.history.pushState("", "", route.path); 

  // Llama a la función asociada con la página de la ruta actual para renderizar su contenido
  route.page(); 
}