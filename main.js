import "./style.css";
import { Header } from "./src/components/Header/Header";
import { Main } from "./src/components/Main/Main";
import { Hero } from "./src/pages/Hero/Hero";
import { LoginRegister } from "./src/pages/LoginRegister/LoginRegister";
import { routes } from "./src/routes/routes";

// Función para renderizar la página correcta según la ruta actual
const renderPage = () => {
  const path = window.location.pathname; // Obtiene la ruta actual.
  const route = routes.find((r) => r.path === path); // Encuentra la ruta correspondiente.
  const main = document.querySelector("main"); // Selecciona el elemento <main>.

  if (!route) {
    console.error("Ruta no encontrada"); // Si la ruta no está definida, muestra un error.
    return;
  }

  // Controlar la aparición del Header
  if (path === "/inicio" || path === "/perfil" || path === "/crear-evento") {
    if (!document.querySelector("header")) {
      // Si no existe un Header ya renderizado, lo agregamos.
      document.body.prepend(Header());
    }
  } else {
    const existingHeader = document.querySelector("header");
    if (existingHeader) {
      existingHeader.remove(); // Eliminamos el Header en páginas donde no debe aparecer.
    }
  }

  // Renderizamos el contenido principal
  if (main) {
    main.innerHTML = ""; // Limpiamos el contenido de <main>.
    main.appendChild(route.page()); // Renderizamos la página correspondiente.
  }
};


// Inicialización de la aplicación
const initApp = () => {
  Main(); // Crea el elemento <main> en el DOM.
  renderPage(); // Renderiza la página inicial.

  // Escucha los cambios en la navegación del navegador.
  window.addEventListener("popstate", renderPage);
};

//Navega a una ruta
window.navigateTo = (path) => {
  window.history.pushState({}, "", path); // Actualiza la URL sin recargar.
  renderPage(); // Renderiza la página correspondiente.
};

// Inicia la aplicación cuando el DOM esté listo.
document.addEventListener("DOMContentLoaded", initApp);