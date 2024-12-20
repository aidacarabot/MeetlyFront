import { createPage } from "../../utils/functions/createPage"; // Utilidad para crear páginas en el DOM.
import { LoginForm } from "../../components/LoginForm/LoginForm"; // Importa el formulario de login.
import { RegisterForm } from "../../components/RegisterForm/RegisterForm"; // Importa el formulario de registro.
import { Button } from "../../components/Button/Button"; // Importa el componente de botón.
import "./LoginRegister.css";

// Función que renderiza la página de login o registro dependiendo de la ruta (path).
export const LoginRegister = (path) => {
  const div = createPage("loginRegister"); // Crea un contenedor para la página.

  //! Función para redirigir al formulario de registro
  const goToRegister = () => {
    showRegisterForm(); // Llama a la función para mostrar el formulario de registro.
  };

  //! Función para redirigir al formulario de login
  const goToLogin = () => {
    showLoginForm(); // Llama a la función para mostrar el formulario de login.
  };

  //! Función para mostrar el formulario de login.
  const showLoginForm = () => {
    div.innerHTML = ""; // Limpia el contenedor.
    div.appendChild(LoginForm(goToRegister)); // Pasa la función `goToRegister` al formulario de login.
    addBackButton(div); // Añade el botón de "Volver al menú principal".
  };

  //! Función para mostrar el formulario de registro con la posibilidad de redirigir al login.
  const showRegisterForm = () => {
    div.innerHTML = ""; // Limpia el contenedor.
    // Añade el formulario de registro y pasa las funciones de redirección:
    div.appendChild(RegisterForm(goToLogin, goToLogin)); // Pasa `goToLogin` al formulario de registro.
    addBackButton(div); // Añade el botón de "Volver al menú principal".
  };

  //! Función para añadir el botón de "Volver al menú principal"
  const addBackButton = (container) => {
    const backButton = Button(
      "Volver al menú principal", // Texto del botón.
      "back-button", // Clase CSS personalizada.
      () => {
        window.navigateTo("/"); // Redirige a la página Hero.
      },
      "back-button-id", // ID opcional del botón.
      true, // Indica que el botón utilizará un <span>.
      "back-button-span" // Clase personalizada para el <span>.
    );
    container.appendChild(backButton); // Añade el botón al contenedor.
  };

  //! Decide qué formulario mostrar según la ruta actual.
  if (path === "/login") {
    showLoginForm(); // Muestra el formulario de login.
  } else if (path === "/register") {
    showRegisterForm(); // Muestra el formulario de registro.
  }

  return div; // Devuelve el contenedor principal.
};