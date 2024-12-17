//Esto es para crear un main en el body que usaremos para cáda página
import "./Main.css";

// Exportamos una función llamada Main que crea un elemento <main>.
export const Main = () => {
  const main = document.createElement("main"); // Creamos un nuevo elemento HTML <main>.

  // Añadimos el elemento <main> recién creado al <body> del documento.
  // Esto asegura que todas las páginas tendrán un contenedor principal donde se insertará su contenido.
  document.body.appendChild(main);
}