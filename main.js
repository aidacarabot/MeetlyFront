import "./style.css";
import { Header } from "./src/components/Header/Header";
import { Main } from "./src/components/Main/Main";
import { Hero } from "./src/pages/Hero/Hero";
import { LoginRegister } from "./src/pages/LoginRegister/LoginRegister";
import { routes } from "./src/routes/routes";

// Función para renderizar la página correcta
const renderPage = () => {
  const path = window.location.pathname;
  const route = routes.find(r => r.path === path) || routes.find(r => r.path === "/");
  
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = "";
    if (path === "/") {
      main.appendChild(Hero());
    } else if (path === "/login" || path === "/register") {
      main.appendChild(LoginRegister(path));
    }
    // Añade más condiciones aquí para otras rutas si es necesario
  } else {
    console.error("Element 'main' not found");
  }
};

// Inicialización de la aplicación
const initApp = () => {
  Header();
  Main();
  renderPage(); // Renderiza la página inicial basada en la ruta actual

  // Añade un event listener para manejar los cambios de ruta
  window.addEventListener("popstate", renderPage);
};

// Inicia la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initApp);

// Función para navegar a una nueva ruta
window.navigateTo = (path) => {
  window.history.pushState({}, "", path);
  renderPage();
};