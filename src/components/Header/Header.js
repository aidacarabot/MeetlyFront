// Importa las rutas disponibles desde el archivo de rutas
import { routes } from "../../routes/routes";

// Importa la función 'reload' que se encargará de manejar los eventos de recarga
import { reload } from "../../utils/functions/reload";

// Define y exporta el componente 'Header'
export const Header = () => {
  // Selecciona el segundo, tercer y quinto objeto del array de rutas (por ejemplo: inicio, perfil, login)
  const selectedRoutes = [routes[1], routes[2], routes[4]]; 

  // Itera sobre las rutas seleccionadas para realizar modificaciones
  selectedRoutes.forEach((route) => {
    // Si el texto de la ruta es "Login", lo cambia por "Logout"
    if (route.text === "Login") {
      route.text = "Logout";
    }
  });

  // Crea un elemento <header> para contener la navegación
  const header = document.createElement("header");

  // Crea un elemento <nav> para estructurar el menú de navegación
  const nav = document.createElement("nav");

  // Crea un elemento <ul> para la lista de enlaces del menú
  const ul = document.createElement("ul");

  // Itera sobre las rutas seleccionadas para generar los elementos del menú
  selectedRoutes.forEach((route) => {
    // Crea un elemento <li> para cada ruta
    const li = document.createElement("li");

    // Crea un elemento <a> para el enlace de cada ruta
    const a = document.createElement("a");

    // Agrega un evento 'click' al enlace que llama a la función 'reload' con el evento y la ruta actual
    a.addEventListener("click", (e) => reload(e, route));

    // Establece el texto del enlace con el nombre de la ruta (por ejemplo, "Logout" en lugar de "Login")
    a.textContent = route.text;

    // Establece el atributo href del enlace con el path de la ruta
    a.href = route.path;

    // Agrega el enlace <a> al elemento de lista <li>
    li.appendChild(a);

    // Agrega el elemento <li> a la lista <ul>
    ul.appendChild(li);
  });

  // Agrega la lista <ul> al elemento <nav>
  nav.appendChild(ul);

  // Agrega el elemento <nav> al elemento <header>
  header.appendChild(nav);

  // Finalmente, agrega el elemento <header> al cuerpo del documento
  document.body.appendChild(header);
};