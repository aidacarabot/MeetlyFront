import { Button } from "../../components/Button/Button";
import { Events } from "../../components/Events/Events";
import { routes } from "../../routes/routes";
import { createPage } from "../../utils/functions/createPage";
import "./Hero.css";


 //! Crea el título y descripción del Hero.
const createHeroHeader = () => {
  const fragment = document.createDocumentFragment();

  const h1 = document.createElement("h1");
  h1.textContent = "Meetly"; // Título principal.

  const description = document.createElement("p");
  description.textContent = "Descubre los mejores eventos cerca de ti."; // Descripción.

  fragment.append(h1, description);
  return fragment;
};

//! Crea los botones de inicio de sesión y registro.
const createLoginRegisterButtons = () => {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.id = "login-register-buttons";

  // Obtiene las rutas de login y registro desde las rutas definidas
  const loginRoute = routes.find((route) => route.path === "/login");
  const registerRoute = routes.find((route) => route.path === "/register");

   // Botón para "Iniciar Sesión"
  const loginButton = Button(
    loginRoute.text, // Texto: "Iniciar Sesión".
    "btn-login-register", // Clase CSS.
    () => window.navigateTo("/login") // Navegar a "/login".
  );

  // Botón para "Registrarse"
  const registerButton = Button(
    registerRoute.text, // Texto: "Registrarse".
    "btn-login-register", // Clase CSS.
    () => window.navigateTo("/register") // Navegar a "/register".
  );

  // Añade ambos botones al contenedor
  buttonContainer.append(loginButton, registerButton);
  return buttonContainer;
};

//! Crea el botón para acceder a todos los eventos.
const createAccessAllEventsButton = () => {
  return Button(
    "Inicia Sesión para Acceder a todos ellos", // Texto del botón.
    "btn-access-all", // Clase CSS.
    () => {
      // Acción al hacer clic: desplaza hasta los botones de login/registro.
      const loginRegisterButtons = document.getElementById("login-register-buttons");
      if (loginRegisterButtons) {
        loginRegisterButtons.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave.
      }
    }
  );
};

//! Renderiza la página Hero.
export const Hero = () => {
  const heroDiv = createPage("hero"); // Crea un contenedor para el Hero.

  heroDiv.appendChild(createHeroHeader()); // Añade el título y la descripción.
  heroDiv.appendChild(createLoginRegisterButtons()); // Añade los botones de inicio de sesión y registro.

  Events(heroDiv, 10); // Añade una sección de eventos (máximo 10 eventos).

  heroDiv.appendChild(createAccessAllEventsButton()); // Añade el botón para acceder a más eventos.

  return heroDiv; // Devuelve el contenedor del Hero completo.
};