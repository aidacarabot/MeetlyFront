import { routes } from "../../routes/routes"; // Importamos las rutas definidas
import { reload } from "../../utils/functions/reload"; // Importamos la función reload para manejar redirecciones sin recargar la página.
import "./Header.css";

export const Header = () => {
  //! 1. Crear el contenedor principal del Header.
  const header = document.createElement("header"); // Creamos un elemento <header> que será el contenedor principal del encabezado.
  const nav = document.createElement("nav"); // Creamos un elemento <nav> para contener la navegación.
  const ul = document.createElement("ul"); // Creamos un elemento <ul> para la lista de enlaces.

  //! 2. Obtener el nombre de usuario desde el localStorage.
  const username = localStorage.getItem("username"); // Recuperamos el nombre de usuario almacenado, si existe.

  //! 3. Verificar si el usuario está autenticado.
  const isAuthenticated = !!localStorage.getItem("token");
   // Si el token está presente en el localStorage, el usuario está autenticado.
  // `!!` convierte el valor a un booleano.

  // Debugging: Verifica los valores de `isAuthenticated` y `username`.
  console.log({ isAuthenticated, username }); 

  //! 4. Agregar un mensaje de bienvenida si el usuario está autenticado.
  if (isAuthenticated && username) {
    const welcomeText = document.createElement("p");  // Creamos un elemento <p>.
    welcomeText.textContent = `Bienvenid@ ${username}`; // Mensaje personalizado
    welcomeText.className = "welcome-text"; // Clase CSS para el mensaje
    header.appendChild(welcomeText); // Agregamos el mensaje al Header
  }

  //! 5. Seleccionar las rutas que aparecerán en el menú.
  const selectedRoutes = [
    routes.find((route) => route.path === "/inicio"), // Ruta Inicio/Home
    routes.find((route) => route.path === "/perfil"), // Ruta Perfil
  ];

  if (isAuthenticated) {
    //! 6. Si el usuario está autenticado, añadimos una opción para "Cerrar Sesión".
    selectedRoutes.push({
      path: "/", // Ruta a la página principal (Hero)
      text: "Cerrar Sesión", // Texto del enlace.
      action: () => {
        // Acción al hacer clic en "Cerrar Sesión".
        localStorage.removeItem("token"); // Eliminamos el token del localStorage.
        localStorage.removeItem("username"); // Eliminamos el nombre de usuario del localStorage.
        window.navigateTo("/"); // Redirigimos al usuario a la página principal.
      },
    });
  } else {
    //! 7. Si el usuario no está autenticado, añadimos una opción para "Iniciar Sesión".
    selectedRoutes.push(routes.find((route) => route.path === "/login"));
  }

 //! 8. Construir el menú de navegación.
  selectedRoutes.forEach((route) => {
    const li = document.createElement("li"); // Creamos un elemento <li> para cada enlace.
    const a = document.createElement("a"); // Creamos un elemento <a> (enlace).

    a.textContent = route.text; // Establecemos el texto del enlace.
    a.href = route.path; // Establecemos la ruta del enlace.

    if (route.action) {
      //! 9. Si la ruta tiene una acción personalizada, la asignamos.
      a.addEventListener("click", (e) => {
        e.preventDefault(); // Evitamos que el navegador recargue la página.
        route.action(); // Ejecutamos la acción personalizada.
      });
    } else {
      //! 10. Si no hay una acción personalizada, usamos `reload` para manejar la navegación.
      a.addEventListener("click", (e) => reload(e, route)); // Redirigimos a la página asociada a la ruta sin recargar.
    }

    li.appendChild(a); // Añadimos el enlace al elemento <li>.
    ul.appendChild(li); // Añadimos el <li> a la lista <ul>.
  });

  //! 11. Añadir la lista al contenedor de navegación.
  nav.appendChild(ul); // Insertamos la lista <ul> en el <nav>.

  //! 12. Insertar el contenedor de navegación en el Header.
  header.appendChild(nav); // Insertamos el <nav> en el <header>.

  //! 13. Insertar el Header al inicio del <body>.
  document.body.prepend(header); // Colocamos el Header como el primer hijo del <body>.
};