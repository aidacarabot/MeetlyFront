import { routes } from "../../routes/routes";
import { reload } from "../../utils/functions/reload";

export const Header = () => {
  // Selecciona el segundo, tercer y quinto objeto del array (inicio, perfil, login)
  const selectedRoutes = [routes[1], routes[2], routes[4]]; 

  // Modifica el texto de la ruta "Login" a "Logout"
  selectedRoutes.forEach((route) => {
    if (route.text === "Login") {
      route.text = "Logout";
    }
  });

  const header = document.createElement("header");
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  // Recorre las rutas seleccionadas
  selectedRoutes.forEach((route) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.addEventListener("click", (e) => reload(e, route));

    a.textContent = route.text; // Aquí se verá "Logout" en lugar de "Login"
    a.href = route.path;
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  header.appendChild(nav);
  document.body.appendChild(header);
}