import { Button } from "../../components/Button/Button";
import { Events } from "../../components/Events/Events";
import { routes } from "../../routes/routes";
import { createPage } from "../../utils/functions/createPage";
import "./Hero.css";

//! Función que crea el título y la descripción de la página Hero.
const createHeroHeader = () => {
  const fragment = document.createDocumentFragment(); //? Creamos un fragmento para agrupar múltiples nodos. Un DocumentFragment es un contenedor especial en JavaScript que te permite almacenar y organizar nodos del DOM (elementos como div, p, etc.) antes de insertarlos en el documento. Es como un “lienzo invisible” en el que puedes construir una estructura de elementos sin que estos afecten directamente al DOM visible mientras los estás creando. Cuando estás listo, puedes añadir el fragmento al DOM con todos sus elementos, y este proceso es más eficiente que insertar cada elemento individualmente.

  const h1 = document.createElement("h1"); // Creamos el título principal.
  h1.textContent = "Meetly"; // Establecemos el texto del título.

  const description = document.createElement("p"); // Creamos una descripción para la página.
  description.textContent = "Descubre los mejores eventos cerca de ti."; // Añadimos el texto descriptivo.

  fragment.append(h1, description); // Añadimos el título y la descripción al fragmento.
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

  //? Creamos el botón para "Iniciar Sesión".
  const loginButton = Button(
    loginRoute.text, // Usamos el texto definido en la ruta (por ejemplo, "Iniciar Sesión").
    "btn-login-register", // Clase CSS para estilizar el botón.
    () => window.navigateTo("/login") // Definimos la acción para navegar a la página de login.
  );

  //? Creamos el botón para "Registrarse".
  const registerButton = Button(
    registerRoute.text, // Usamos el texto definido en la ruta (por ejemplo, "Registrarse").
    "btn-login-register", // Clase CSS para estilizar el botón.
    () => window.navigateTo("/register") // Definimos la acción para navegar a la página de registro.
  );

  //? Añadimos ambos botones al contenedor.
  buttonContainer.append(loginButton, registerButton);
  return buttonContainer; // Devolvemos el contenedor con los botones.
};

//! Función que crea un botón para acceder a más eventos.
const createAccessAllEventsButton = () => {
  return Button(
    "Inicia Sesión para Acceder a todos ellos", // Texto del botón que invita al usuario a iniciar sesión.
    "btn-access-all", // Clase CSS para estilizar el botón.
    () => {
      // Definimos la acción que se ejecuta al hacer clic en el botón.
      const loginRegisterButtons = document.getElementById("login-register-buttons"); // Buscamos el contenedor de botones de login/registro.
      if (loginRegisterButtons) {
        loginRegisterButtons.scrollIntoView({ behavior: "smooth" }); // Hacemos un desplazamiento suave hacia los botones.
      }
    }
  );
};

//! Función principal para renderizar la página Hero.
export const Hero = () => {
  const heroDiv = createPage("hero"); // Creamos un contenedor principal para la página Hero.

  heroDiv.appendChild(createHeroHeader()); // Añadimos el título y la descripción al contenedor principal.
  heroDiv.appendChild(createLoginRegisterButtons()); // Añadimos los botones de inicio de sesión y registro.

  // Renderizamos una lista de eventos dentro del contenedor Hero.
  // Pasamos `heroDiv` como contenedor principal y un límite de 10 eventos.
  Events(heroDiv, 10);

  // Añadimos el botón para acceder a más eventos, que invita al usuario a iniciar sesión.
  heroDiv.appendChild(createAccessAllEventsButton());

  return heroDiv; // Devolvemos el contenedor completo para que sea renderizado en la aplicación.
};