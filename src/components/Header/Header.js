import { routes } from "../../routes/routes"; // Importamos las rutas definidas
import { reload } from "../../utils/functions/reload"; // Importamos la función para manejar las redirecciones
import "./Header.css"; // Importamos el archivo CSS para estilos del Header

export const Header = () => {
  const header = document.createElement("header");
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  const username = localStorage.getItem("username"); // Obtén el nombre de usuario desde el localStorage

  // Agrega el texto de bienvenida si el usuario está autenticado
  if (username) {
    const welcomeText = document.createElement("p");
    welcomeText.textContent = `Bienvenid@ ${username}`; // Texto personalizado
    welcomeText.className = "welcome-text"; // Clase para estilizar el mensaje
    header.appendChild(welcomeText); // Agregamos el texto de bienvenida al Header
  }

  const selectedRoutes = [
    routes.find(route => route.path === "/inicio"), // Ruta para Inicio/Home
    routes.find(route => route.path === "/perfil"), // Ruta para Perfil
  ];

  const isAuthenticated = !!localStorage.getItem("token"); // Verifica si hay un token

  if (isAuthenticated) {
    // Agregar "Cerrar Sesión" como una opción
    selectedRoutes.push({
      path: "/",
      text: "Cerrar Sesión",
      action: () => {
        // Elimina el token y el nombre de usuario de localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.navigateTo("/"); // Redirige al Hero
      },
    });
  } else {
    // Si no está autenticado, agregar "Iniciar Sesión"
    selectedRoutes.push(routes.find(route => route.path === "/login")); // Ruta para Iniciar Sesión
  }

  // Crear los elementos del menú de navegación
  selectedRoutes.forEach((route) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = route.text; // Texto del enlace
    a.href = route.path; // Ruta del enlace

    if (route.action) {
      // Si tiene una acción personalizada (como cerrar sesión), asignarla
      a.addEventListener("click", (e) => {
        e.preventDefault();
        route.action(); // Ejecutar la acción
      });
    } else {
      // Navegar a la ruta usando reload
      a.addEventListener("click", (e) => reload(e, route));
    }

    li.appendChild(a); // Agrega el enlace al <li>
    ul.appendChild(li); // Agrega el <li> a la lista <ul>
  });

  nav.appendChild(ul); // Agrega la lista <ul> al <nav>
  header.appendChild(nav); // Agrega el <nav> al <header>

  document.body.prepend(header); // Inserta el Header al inicio del <body>
};