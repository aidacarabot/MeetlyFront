import { Button } from "../../components/Button/Button";
import { Events } from "../../components/Events/Events";
import { routes } from "../../routes/routes";
import { createPage } from "../../utils/functions/createPage";
import "./Hero.css";

//! Función que crea el título y la descripción de la página Hero.
const createHeroHeader = () => {
  const fragment = document.createDocumentFragment(); //? Creamos un fragmento para agrupar múltiples nodos. Un DocumentFragment es un contenedor especial en JavaScript que te permite almacenar y organizar nodos del DOM (elementos como div, p, etc.) antes de insertarlos en el documento. Es como un “lienzo invisible” en el que puedes construir una estructura de elementos sin que estos afecten directamente al DOM visible mientras los estás creando. Cuando estás listo, puedes añadir el fragmento al DOM con todos sus elementos, y este proceso es más eficiente que insertar cada elemento individualmente.

   //! Creamos el contenedor principal que agrupa title-description y botones.
   const heroHeaderContainer = document.createElement("div");
   heroHeaderContainer.className = "hero-header-container"; // Clase para el contenedor.

  const titleDescription = document.createElement("div");
  titleDescription.className = "title-description-div";

  const h1 = document.createElement("h1"); // Creamos el título principal.
  h1.textContent = "Meetly"; // Establecemos el texto del título.

  const description = document.createElement("p"); // Creamos una descripción para la página.
  description.textContent = "¿Aburrido de no saber qué hacer? Aquí encontrarás los eventos más chulos cerca de ti: conciertos, expos, talleres y planes que te sacan de la rutina. Explora, apúntate con un clic y vive nuevas experiencias mientras conoces gente con tus mismos intereses. Porque los mejores recuerdos empiezan con un buen plan. ¿Te apuntas? 🎉"; // Añadimos el texto descriptivo.
  description.className = "description-hero";

  titleDescription.append(h1, description);

  //! Contenedor de botones (llamada a función).
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
    loginRoute.text,           // Texto: "Iniciar Sesión".
    "btn-login-register",      // Clase principal del botón.
    () => window.navigateTo("/login"), // Acción al hacer clic.
    "",                        // ID opcional (vacío en este caso).
    true,                      // Indicamos que queremos usar un `span`.
    "button-top-hero-span"     // Clase específica para el span.
  );

  //! Botón de "Registrarse"
  const registerButton = Button(
    registerRoute.text, 
    "btn-login-register", 
    () => window.navigateTo("/register"),
    "", 
    true, 
    "button-top-hero-span"     // Clase específica para el span.
  );

  //? Añadimos ambos botones al contenedor.
  buttonContainer.append(loginButton, registerButton);
  return buttonContainer; // Devolvemos el contenedor con los botones.
};

//! Función que crea un botón para acceder a más eventos.
const createAccessAllEventsButton = () => {
  return Button(
    "Inicia Sesión Para Acceder A Todos Ellos!", // Texto del botón que invita al usuario a iniciar sesión.
    "btn-access-all", // Clase CSS para estilizar el botón.
    () => {
      // Acción al hacer clic en el botón: desplazarse al inicio de la página.
      window.scrollTo({ top: 0, behavior: "smooth" }); // Redirige al inicio con desplazamiento suave.
    }
  );
};

//! Función principal para renderizar la página Hero.
export const Hero = () => {
  const heroDiv = createPage("hero");

  heroDiv.appendChild(createHeroHeader()); // Título y descripción.

  // Renderizamos una lista de eventos como carrusel.
  Events(heroDiv, { title: "Echa un vistazo a algunos de los eventos disponibles:" }, true);

  heroDiv.appendChild(createAccessAllEventsButton()); // Botón de acceso a eventos.

  return heroDiv; // Devolvemos el contenedor completo para que sea renderizado en la aplicación.
};