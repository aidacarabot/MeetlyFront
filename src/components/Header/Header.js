import { routes } from "../../routes/routes"; // Importamos las rutas definidas
import { reload } from "../../utils/functions/reload"; // Función para manejar redirecciones
import "./Header.css"; // Importamos estilos para el Header

export const Header = () => {
  const header = document.createElement("header"); // Creamos el contenedor principal del Header
  const nav = document.createElement("nav"); // Creamos el contenedor de navegación
  const ul = document.createElement("ul"); // Creamos la lista para las rutas

  // Obtenemos el nombre de usuario desde el localStorage
  const username = localStorage.getItem("username");

  // Verifica si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem("token");

  // Agregamos un mensaje de bienvenida si el usuario está autenticado
  if (isAuthenticated && username) {
    const welcomeText = document.createElement("p");
    welcomeText.textContent = `Bienvenid@ ${username}`; // Mensaje personalizado
    welcomeText.className = "welcome-text"; // Clase CSS para el mensaje
    header.appendChild(welcomeText); // Agregamos el mensaje al Header
  }

  // Seleccionamos las rutas que deben aparecer en el menú de navegación
  const selectedRoutes = [
    routes.find((route) => route.path === "/inicio"), // Ruta Inicio/Home
    routes.find((route) => route.path === "/perfil"), // Ruta Perfil
  ];

  if (isAuthenticated) {
    // Agregamos la opción "Cerrar Sesión" si el usuario está autenticado
    selectedRoutes.push({
      path: "/", // Ruta a la página principal (Hero)
      text: "Cerrar Sesión",
      action: () => {
        // Elimina los datos del localStorage y redirige al Hero
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.navigateTo("/"); // Redirige a la página principal
      },
    });
  } else {
    // Agregamos "Iniciar Sesión" si el usuario no está autenticado
    selectedRoutes.push(routes.find((route) => route.path === "/login"));
  }

  // Iteramos sobre las rutas seleccionadas para construir el menú
  selectedRoutes.forEach((route) => {
    const li = document.createElement("li"); // Creamos un elemento de lista
    const a = document.createElement("a"); // Creamos un enlace

    a.textContent = route.text; // Texto del enlace
    a.href = route.path; // Ruta del enlace

    if (route.action) {
      // Si la ruta tiene una acción personalizada, la asignamos
      a.addEventListener("click", (e) => {
        e.preventDefault(); // Evita la recarga del navegador
        route.action(); // Ejecuta la acción asociada
      });
    } else {
      // Si no hay acción personalizada, usamos reload para navegar
      a.addEventListener("click", (e) => reload(e, route));
    }

    li.appendChild(a); // Agregamos el enlace al elemento de lista
    ul.appendChild(li); // Agregamos el elemento de lista a la lista principal
  });

  nav.appendChild(ul); // Agregamos la lista de navegación al nav
  header.appendChild(nav); // Agregamos el nav al Header

  // Insertamos el Header al inicio del <body>
  document.body.prepend(header);
};