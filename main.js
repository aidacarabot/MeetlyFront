import "./style.css";
import { Header } from "./src/components/Header/Header";
import { Main } from "./src/components/Main/Main";
import { routes } from "./src/routes/routes";

// Renderiza la página correcta según la ruta
const renderPage = () => {
  const path = window.location.pathname;
  const route = routes.find((r) => r.path === path) || routes.find((r) => r.path === "/");

  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = ""; // Limpia el contenido anterior

    const pageContent = route.page();
    if (pageContent) {
      main.appendChild(pageContent); // Agrega el contenido de la página al <main>
    } else {
      console.error(`La ruta "${path}" no devolvió contenido válido.`);
    }
  } else {
    console.error("Elemento 'main' no encontrado en el DOM.");
  }
};

// Inicializa la aplicación
const initApp = () => {
  Header(); // Agrega el Header al principio.
  Main(); // Crea el <main> después del Header.
  renderPage(); // Renderiza la página inicial según la ruta actual.

  // Maneja los cambios de ruta
  window.addEventListener("popstate", renderPage);
};

// Ejecuta la inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", initApp);

// Navega a una nueva ruta
window.navigateTo = (path) => {
  window.history.pushState({}, "", path); // Actualiza la URL sin recargar.
  renderPage(); // Renderiza la página correspondiente.
};