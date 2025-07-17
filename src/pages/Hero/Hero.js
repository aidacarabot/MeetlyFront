//! Importación de dependencias y utilidades
import { Button } from "../../components/Button/Button";
import { Events } from "../../components/Events/Events";
import { routes } from "../../routes/routes";
import { createPage } from "../../utils/functions/createPage";
import "./Hero.css";

//! Función que crea el título y la descripción de la página Hero.
const createHeroHeader = () => {
  const fragment = document.createDocumentFragment(); //? Creamos un fragmento para agrupar múltiples nodos.

  //! Creamos el contenedor principal que agrupa title-description y botones.
  const heroHeaderContainer = document.createElement("div");
  heroHeaderContainer.className = "hero-header-container"; // Clase para el contenedor.

  //! Contenedor para el título y descripción.
  const titleDescription = document.createElement("div");
  titleDescription.className = "title-description-div";

  const h1 = document.createElement("h1"); // Creamos el título principal.
  h1.textContent = "Meetly"; // Establecemos el texto del título.

  const description = document.createElement("p"); // Creamos una descripción para la página.
  description.textContent =
    "Bored of not knowing what to do? Discover the coolest events near you—concerts, exhibitions, workshops, and plans that break your routine. Explore, sign up with one click, and enjoy new experiences while meeting people who share your interests. Because the best memories start with a great plan. Are you in? 🎉";
  description.className = "description-hero";

  titleDescription.append(h1, description);

  //! Contenedor de botones (llamada a función auxiliar).
  const buttonContainer = createLoginRegisterButtons();

  //! Añadimos los contenedores al contenedor principal.
  heroHeaderContainer.append(titleDescription, buttonContainer);

  //! Añadimos el contenedor principal al fragmento.
  fragment.append(heroHeaderContainer);

  return fragment; // Devolvemos el fragmento con los elementos agrupados.
};

//! Función que crea los botones de inicio de sesión y registro.
const createLoginRegisterButtons = () => {
  const buttonContainer = document.createElement("div"); // Creamos un contenedor para los botones.
  buttonContainer.className = "button-container"; // Añadimos una clase CSS para estilos.
  buttonContainer.id = "login-register-buttons"; // Asignamos un ID para facilitar su referencia.

  // Buscamos las rutas de inicio de sesión y registro dentro de las rutas definidas.
  const loginRoute = routes.find((route) => route.path === "/login");
  const registerRoute = routes.find((route) => route.path === "/register");

  //! Botón de "Iniciar Sesión"
  const loginButton = Button(
    loginRoute.text, // Texto: "Iniciar Sesión".
    "btn-login-register", // Clase principal del botón.
    () => window.navigateTo("/login"), // Acción al hacer clic.
    "", // ID opcional (vacío en este caso).
    true, // Indicamos que queremos usar un `span`.
    "button-top-hero-span" // Clase específica para el span.
  );

  //! Botón de "Registrarse"
  const registerButton = Button(
    registerRoute.text,
    "btn-login-register",
    () => window.navigateTo("/register"),
    "",
    true,
    "button-top-hero-span" // Clase específica para el span.
  );

  //? Añadimos ambos botones al contenedor.
  buttonContainer.append(loginButton, registerButton);
  return buttonContainer; // Devolvemos el contenedor con los botones.
};

//! Función que crea un botón para acceder a más eventos con diseño de UIverse.
const createAccessAllEventsButton = () => {
  return Button(
    'Sign in to access all events', // Texto del botón.
    'uiverse-access-btn', // Clase CSS para el diseño específico del botón.
    () => {
      // Acción al hacer clic en el botón: desplazarse al inicio de la página.
      window.scrollTo({ top: 0, behavior: 'smooth' }) // Redirige al inicio con desplazamiento suave.
    },
    'access-button-id', // ID opcional.
    true, // Indicamos que usamos un <span> en el botón.
    'uiverse-access-btn-top' // Clase específica para el <span>.
  )
};

//! Función principal para renderizar la página Hero.
export const Hero = () => {
  const heroDiv = createPage("hero"); //? Creamos el contenedor principal.

  heroDiv.appendChild(createHeroHeader()); // Título y descripción.

  //! Renderizamos una lista de eventos como carrusel con título, pero sin buscador.
  Events(heroDiv, { title: "Explore the events waiting for you:", showSearchBox: false }, true);

  heroDiv.appendChild(createAccessAllEventsButton()); // Botón de acceso a eventos.

  return heroDiv; // Devolvemos el contenedor completo para que sea renderizado en la aplicación.
};