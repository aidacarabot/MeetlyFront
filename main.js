import "./style.css";
import { Header } from "./src/components/Header/Header"; // Importamos la función para renderizar el Header.
import { Main } from "./src/components/Main/Main"; // Importamos la función para crear el contenedor <main>.
import { routes } from "./src/routes/routes"; // Importamos las rutas definidas en el archivo routes.js.

//! Función para manejar el renderizado del Header
const renderHeader = () => {
  const existingHeader = document.querySelector("header"); // Selecciona el Header existente en el DOM.
  if (existingHeader) existingHeader.remove(); // Si ya hay un Header, lo elimina para evitar duplicados.

  const currentPath = window.location.pathname; // Obtiene la ruta actual de la URL.

  // Rutas donde no queremos mostrar el Header.
  const excludePaths = ["/", "/login", "/register"];

  // Comprobamos si el usuario está autenticado.
  const isAuthenticated = !!localStorage.getItem("token"); // Comprueba si existe un token en localStorage.

  // Renderiza el Header solo si el usuario está autenticado y no está en una ruta excluida.
  if (isAuthenticated && !excludePaths.includes(currentPath)) {
    Header(); // Llama a la función `Header` para renderizar el Header.
  }
};

//! Función para renderizar la página según la ruta actual
const renderPage = () => {
  const path = window.location.pathname;

  //! Busca una ruta que coincida con la ruta actual o maneja rutas dinámicas. Las rutas dinámicas son las de los eventos, que su path cambia según sea su título de evento.
  //La función find recorre todas las rutas de tu archivo routes.js para encontrar la que coincida con la URL actual (path).
  const route = routes.find((r) => {
    //Si la ruta incluye un ":" (por ejemplo, /event/:eventName), sabemos que es una ruta dinámica, es decir, cambia dependiendo del contenido (como el título de un evento).
    if (r.path.includes(":")) {
      // Detectar rutas dinámicas y verificar coincidencias
      //       Esta línea convierte una ruta como /event/:eventName en un patrón que puede reconocer cualquier cosa que venga después de /event/. Por ejemplo:
      // 	•	/event/concierto-de-rock encajará.
      // 	•	/event/feria-del-libro también encajará.
      // 	•	/event/ no encajará, porque falta el evento.
      // Básicamente, [^/]+ significa: “Cualquier texto después de / que no contenga más /”.
      //? Este código en main.js se utiliza para determinar si la URL actual coincide con alguna de las rutas definidas en routes.js, incluyendo las rutas dinámicas como /event/:eventName.
      const dynamicRoute = new RegExp(`^${r.path.replace(/:\w+/g, "[^/]+")}$`);
      return dynamicRoute.test(path); //La función test verifica si la URL actual (path) encaja con el patrón creado.
    }
    return r.path === path; //Si no es una ruta dinámica, se compara directamente el path de la ruta con la URL actual.
  }) || routes.find((r) => r.path === "/"); //Si después de buscar rutas dinámicas y exactas no encuentra coincidencia, el código busca la ruta "/" como página de respaldo.

  const main = document.querySelector("main"); // Selecciona el elemento <main> en el DOM.
  if (main) {
    main.innerHTML = ""; // Limpia el contenido del <main> para cargar una nueva página.

    const pageContent = route.page(); // Llama a la función `page` asociada a la ruta para obtener su contenido.
    if (pageContent) {
      main.appendChild(pageContent); // Añade el contenido de la página al <main>.
    } else {
      console.error(`La ruta "${path}" no devolvió contenido válido.`); // Mensaje de error si la página no devuelve contenido.
    }
  } else {
    console.error("Elemento <main> no encontrado en el DOM."); // Mensaje de error si no existe un <main> en el DOM.
  }

  renderHeader(); // Asegura que el Header se renderice después de la página
};

//! Función para inicializar la aplicación
const initApp = () => {
  Main(); // Llama a la función `Main` para crear el contenedor <main>.
  renderPage(); // Renderiza la página inicial basada en la ruta actual.

  // Escucha los cambios de la URL sin recargar la página.
  window.addEventListener("popstate", renderPage);
  //? popstate Es un evento que se dispara cuando el usuario navega hacia atrás o hacia adelante en el historial del navegador usando los botones de navegación. renderPage: Es la función que se ejecutará cuando el usuario navegue con “Atrás” o “Adelante”.
};

//! Evento para iniciar la aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", initApp); // Llama a `initApp` una vez que el DOM esté completamente cargado.
//? DOMContentLoaded Es un evento del navegador que se dispara cuando todo el HTML ha sido cargado y procesado por el navegador, pero sin esperar a que se carguen los recursos externos como imágenes, hojas de estilo o scripts.

//! Función para navegar a una nueva ruta
window.navigateTo = (path) => {
  window.history.pushState({}, "", path); // Actualiza la URL sin recargar la página.
  renderPage(); // Renderiza la página asociada a la nueva ruta.
};
// Cuando llamas a window.navigateTo("/nueva-ruta"), se actualiza la URL en el navegador sin recargar (pushState).
// •	Luego, renderPage muestra el contenido correspondiente a esa ruta.