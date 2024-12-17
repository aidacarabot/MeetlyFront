//! Función que crea una nueva página en el DOM con un div principal identificado por un ID
export const createPage = (id) => {
    // **1. Seleccionamos el elemento `<main>` del documento.
  // Esto supone que en tu archivo HTML principal tienes un elemento `<main>` que actúa como el contenedor principal de tu aplicación.
  // Este `<main>` es donde se van a renderizar dinámicamente todas las páginas de tu aplicación.
  const main = document.querySelector("main"); 
  
    // **2. Limpiamos el contenido existente dentro de `<main>`.
  // Esto asegura que cada vez que navegamos a una nueva página, eliminamos cualquier contenido previo.
  // Esto es útil para evitar que las páginas se acumulen unas sobre otras.
  main.innerHTML = ""; 
  
    // **3. Creamos un nuevo elemento `<div>`.
  // Este `<div>` será el contenedor de la nueva página que queremos mostrar.
  const div = document.createElement("div");
  
   // **4. Asignamos un ID al `<div>` recién creado.
  // El `id` se pasa como argumento a la función `createPage`. Esto permite identificar de forma única el contenido de la página.
  // Ejemplo: Si `id` es "profile", este `<div>` tendrá `id="profile"`
  div.id = id; 
  
    // **5. Añadimos el `<div>` al elemento `<main>` del DOM.
  // Con esto, el `<div>` recién creado se convierte en el hijo del `<main>`, y es donde se insertará todo el contenido específico de la página.
  main.append(div); 
  
    // **6. Devolvemos el `<div>` creado.
  // Esto permite que otras funciones o componentes trabajen directamente con este `<div>`.
  // Por ejemplo, puedes usar este `<div>` para añadir formularios, listas de eventos, o cualquier contenido que necesites renderizar.
  return div; 
};