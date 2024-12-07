import "./style.css";
import { Header } from "./src/components/Header/Header";
import { Main } from "./src/components/Main/Main";
import { routes } from "./src/routes/routes";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => !!localStorage.getItem("token");

// Función para manejar el renderizado del Header
const renderHeader = () => {
  const existingHeader = document.querySelector("header");
  if (existingHeader) {
    existingHeader.remove(); // Elimina cualquier Header existente
  }

  const currentPath = window.location.pathname;

  // Renderiza el Header solo si el usuario está autenticado y no está en Hero ("/") ni en Login/Register
  const excludePaths = ["/", "/login", "/register"];
  if (isAuthenticated() && !excludePaths.some((path) => currentPath.startsWith(path))) {
    Header(); // Renderiza el Header
  }
};

// Renderiza la página correcta según la ruta actual
const renderPage = () => {
  const path = window.location.pathname;

  // Buscar una ruta coincidente o manejar dinámicas
  const route = routes.find((r) => {
    if (r.path.includes(":")) {
      // Detectar rutas dinámicas y verificar coincidencias
      const dynamicRoute = new RegExp(`^${r.path.replace(/:\w+/g, "[^/]+")}$`);
      return dynamicRoute.test(path);
    }
    return r.path === path;
  }) || routes.find((r) => r.path === "/");

  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = ""; // Limpia el contenido del <main>

    const pageContent = route.page();
    if (pageContent) {
      main.appendChild(pageContent); // Agrega el contenido de la página
    } else {
      console.error(`La ruta "${path}" no devolvió contenido válido.`);
    }
  } else {
    console.error("Elemento <main> no encontrado en el DOM.");
  }

  renderHeader(); // Actualiza el Header después de renderizar la página
};

// Inicializa la aplicación
const initApp = () => {
  Main(); // Crea el contenedor <main>.
  renderPage(); // Renderiza la página inicial.

  // Escucha los cambios de ruta
  window.addEventListener("popstate", renderPage);
};

// Inicia la aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", initApp);

// Navega a una nueva ruta
window.navigateTo = (path) => {
  window.history.pushState({}, "", path); // Actualiza la URL sin recargar.
  renderPage(); // Renderiza la página correspondiente.
};
