import { createPage } from "../../utils/functions/createPage";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import "./LoginRegister.css";

export const LoginRegister = (path) => {
  const div = createPage("loginRegister");

  // Mostrar el formulario de inicio de sesión.
  const showLoginForm = () => {
    div.innerHTML = "";
    div.appendChild(LoginForm());
  };

  // Mostrar el formulario de registro con un callback para redirigir al inicio de sesión.
  const showRegisterForm = () => {
    div.innerHTML = "";
    div.appendChild(RegisterForm(showLoginForm, showLoginForm));
  };

  if (path === "/login") {
    showLoginForm();
  } else if (path === "/register") {
    showRegisterForm();
  }

  return div;
};