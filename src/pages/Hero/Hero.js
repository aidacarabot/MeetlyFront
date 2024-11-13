
import { Button } from "../../components/Button/Button";
import { Events } from "../../components/Events/Events";
import { createPage } from "../../utils/functions/createPage";
import "./Hero.css";

export const Hero = () => {
  const heroDiv = createPage("hero"); // Creamos y limpiamos <main> con createPage

  const p = document.createElement("p");
  p.textContent = "Bienvenido a ";

  const h1 = document.createElement("h1");
  h1.textContent = "Meetly";

  const description = document.createElement("p");
  description.textContent = "Descubre los mejores eventos cerca de ti.";

  // Creamos un contenedor para los botones
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container"; // Clase para estilos

  // Creamos el botón de "Iniciar Sesión"
  const loginButton = Button(
    "Iniciar Sesión",
    "btn-primary",
    () => (window.location.href = "/login")
  );

  // Creamos el botón de "Registrarse"
  const registerButton = Button(
    "Registrarse",
    "btn-secondary",
    () => (window.location.href = "/register")
  );

  // Añadimos los botones al contenedor
  buttonContainer.append(loginButton, registerButton);

  // Añadimos los elementos al Hero
  heroDiv.append(h1, description, buttonContainer);

  // Llamamos a Events para mostrar los eventos dentro del Hero
  Events(heroDiv); // Pasamos heroDiv como el contenedor donde se añaden los eventos
};