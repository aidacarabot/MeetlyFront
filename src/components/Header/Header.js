import { routes } from "../../routes/routes";
import { reload } from "../../utils/functions/reload";
import "./Header.css";

export const Header = () => {
  const header = document.createElement("header");
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  const selectedRoutes = [routes[1], routes[2], routes[4]]; // Rutas que aparecerán en el Header.

  selectedRoutes.forEach((route) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = route.text; // Texto del enlace.
    a.href = route.path; // Ruta del enlace.

    a.addEventListener("click", (e) => reload(e, route)); // Maneja el clic en el enlace.

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  header.appendChild(nav);

  // Agrega el header al inicio del <body>.
  document.body.prepend(header); // Esto asegura que el Header esté al principio.
};