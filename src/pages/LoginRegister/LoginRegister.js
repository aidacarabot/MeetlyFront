import { createPage } from "../../utils/functions/createPage"; // Utilidad para crear páginas en el DOM.
import { LoginForm } from "../../components/LoginForm/LoginForm"; // Importa el formulario de login.
import { RegisterForm } from "../../components/RegisterForm/RegisterForm"; // Importa el formulario de registro.
import "./LoginRegister.css";

// Función que renderiza la página de login o registro dependiendo de la ruta (path).
export const LoginRegister = (path) => {
  const div = createPage("loginRegister"); // Crea un contenedor para la página.

  //! Función para mostrar el formulario de login.
  const showLoginForm = () => {
    div.innerHTML = ""; // Limpia el contenedor.
    div.appendChild(LoginForm()); // Añade el formulario de login al contenedor.
  };

  //! Función para mostrar el formulario de registro con la posibilidad de redirigir al login.
  const showRegisterForm = () => {
    div.innerHTML = ""; // Limpia el contenedor.
    // Añade el formulario de registro y pasa las funciones de redirección:
    div.appendChild(RegisterForm(showLoginForm, showLoginForm));
    // `showLoginForm` se usa como:
    // - `onSuccessfulRegister`: Para redirigir al login después de un registro exitoso.
    // - `goToLogin`: Para permitir que el enlace "Inicia Sesión" redirija al login.
  };

  //! Decide qué formulario mostrar según la ruta actual.
  if (path === "/login") {
    showLoginForm(); // Muestra el formulario de login.
  } else if (path === "/register") {
    showRegisterForm(); // Muestra el formulario de registro.
  }

  return div; // Devuelve el contenedor principal.
};