import { Button } from "../../components/Button/Button";
import { Events } from "../../components/Events/Events";
import { routes } from "../../routes/routes";
import { createPage } from "../../utils/functions/createPage";
import "./Hero.css";

export const Hero = () => {
  const heroDiv = createPage("hero");

  const p = document.createElement("p");
  p.textContent = "Bienvenido a ";

  const h1 = document.createElement("h1");
  h1.textContent = "Meetly";

  const description = document.createElement("p");
  description.textContent = "Descubre los mejores eventos cerca de ti.";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.id = "login-register-buttons";

  const loginRoute = routes.find(route => route.path === "/login");
  const registerRoute = routes.find(route => route.path === "/register");
  
  const loginButton = Button(
    loginRoute.text,
    "btn-login-register",
    () => window.navigateTo("/login")
  );
  
  const registerButton = Button(
    registerRoute.text,
    "btn-login-register",
    () => window.navigateTo("/register")
  );

  buttonContainer.append(loginButton, registerButton);

  heroDiv.append(h1, description, buttonContainer);

  Events(heroDiv, 10);

  const accessAllEventsButton = Button(
    "Inicia Sesión para Acceder a todos ellos",
    "btn-access-all",
    () => {
      const loginRegisterButtons = document.getElementById('login-register-buttons');
      if (loginRegisterButtons) {
        loginRegisterButtons.scrollIntoView({ behavior: 'smooth' });
      }
    }
  );
  
  heroDiv.append(accessAllEventsButton);
  
  return heroDiv;
};