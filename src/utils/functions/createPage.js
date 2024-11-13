export const createPage = (id) => {
  const main = document.querySelector("main"); // Seleccionamos <main>
  main.innerHTML = ""; // Limpiamos el contenido de <main>

  const div = document.createElement("div");
  div.id = id; // Asignamos el ID pasado como argumento

  main.append(div); // Añadimos el nuevo div al <main>
  return div; // Devolvemos el div creado
};