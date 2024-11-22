// Función que crea una nueva página en el DOM con un div principal identificado por un ID
export const createPage = (id) => {
  // Seleccionamos el elemento <main> del documento
  const main = document.querySelector("main"); 
  
  // Limpiamos el contenido existente dentro de <main>
  main.innerHTML = ""; 
  
  // Creamos un nuevo elemento <div>
  const div = document.createElement("div");
  
  // Asignamos al nuevo <div> el ID proporcionado como argumento
  div.id = id; 
  
  // Añadimos el <div> recién creado como hijo de <main>
  main.append(div); 
  
  // Devolvemos el <div> creado para su uso posterior
  return div; 
};