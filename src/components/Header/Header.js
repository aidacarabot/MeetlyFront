import { routes } from "../../routes/routes";
import { reload } from "../../utils/functions/reload";
import "./Header.css";

export const Header = () => {
  const header = document.createElement("header");
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  const selectedRoutes = [
    routes.find(route => route.path === "/inicio"), // Inicio/Home
    routes.find(route => route.path === "/perfil"), // Perfil
  ];

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    // Agregar "Cerrar Sesión" como una opción
    selectedRoutes.push({
      path: "/", // Redirige al Hero
      text: "Cerrar Sesión",
      action: () => {
        // Elimina el token y redirige al Hero
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.navigateTo("/"); // Redirige al Hero
      },
    });
  } else {
    // Si no está autenticado, agregar "Iniciar Sesión"
    selectedRoutes.push(
      routes.find(route => route.path === "/login") // Iniciar Sesión
    );
  }

  selectedRoutes.forEach((route) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = route.text; // Texto del enlace.
    a.href = route.path; // Ruta del enlace.

    if (route.action) {
      // Si tiene una acción personalizada, asignarla
      a.addEventListener("click", (e) => {
        e.preventDefault();
        route.action(); // Ejecutar la acción (Cerrar Sesión)
      });
    } else {
      // Navegar a la ruta usando reload
      a.addEventListener("click", (e) => reload(e, route));
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  header.appendChild(nav);

  // Agrega el header al inicio del <body>
  document.body.prepend(header); // Insertar al inicio del body
};