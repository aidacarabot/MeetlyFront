import { createPage } from "../../utils/functions/createPage";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import "./LoginRegister.css";

export const LoginRegister = (path) => {
  const div = createPage("loginRegister");

  const showLoginForm = () => {
    div.innerHTML = '';
    div.appendChild(LoginForm());
  };

  const showRegisterForm = () => {
    div.innerHTML = '';
    div.appendChild(RegisterForm(showLoginForm));
  };

  if (path === "/login") {
    showLoginForm();
  } else if (path === "/register") {
    showRegisterForm();
  }

  return div;
};