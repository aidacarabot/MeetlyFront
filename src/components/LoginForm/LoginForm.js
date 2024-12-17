// 1.	Formulario de inicio de sesión:
// •	Creamos un formulario con campos para el usuario o email y la contraseña.
// •	Añadimos un botón de envío y un contenedor para mensajes.
// 2.	Manejo del envío:
// •	Recogemos los datos del formulario con FormData y los convertimos a un objeto.
// •	Hacemos una petición al backend para autenticar al usuario.
// •	Si es exitoso:
// •	Guardamos el token y los datos del usuario en localStorage.
// •	Mostramos un mensaje de éxito con showSuccessMessage.
// •	Redirigimos al usuario a la página de inicio.
// •	Si hay un error:
// •	Mostramos un mensaje de error con showErrorMessage.

import { fetchData } from "../../utils/api/fetchData";
import { showSuccessMessage, showErrorMessage } from "../../utils/functions/messages"; // Importamos las funciones reutilizables para mensajes.
import "./LoginForm.css";

// Renderiza el formulario de inicio de sesión
export const LoginForm = () => {
  const form = document.createElement("form"); // Creamos el formulario.
  form.className = "login-form"; // Añadimos una clase CSS para estilos.

  // Estructura del formulario
  form.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <input type="text" name="usernameOrEmail" placeholder="Nombre de Usuario o Email" required />
    <input type="password" name="password" placeholder="Contraseña" required />
    <button type="submit">Iniciar Sesión</button>
    <div id="message" class="message"></div> <!-- Contenedor para mensajes -->
  `;

  const messageElement = form.querySelector("#message"); // Elegimos el contenedor donde se mostrarán los mensajes y lo metemos en una constante.

  // Maneja el envío del formulario. El evento submit se activa automáticamente cuando el usuario hace clic en el botón de tipo submit dentro del formulario o presiona “Enter” en un campo del formulario. 
  // El parámetro e (evento): Es un objeto que contiene información sobre el evento que se ha activado, en este caso, el envío del formulario (submit). Permite interactuar con el comportamiento del formulario, como evitar la recarga de la página con e.preventDefault().
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página.

    messageElement.style.display = "none"; // Oculta cualquier mensaje previo.	•	La propiedad style.display controla cómo se muestra ese elemento:
    // •	"none": Oculta el elemento.
    // •	"block", "inline", etc.: Muestra el elemento dependiendo de cómo lo quieras renderizar.
    // •	Aquí se usa para asegurarse de que cualquier mensaje anterior no sea visible al intentar enviar el formulario nuevamente.

    const formData = new FormData(form); // Recogen automáticamente los datos del formulario (incluidos nombres y valores) usando FormData.
    const loginData = Object.fromEntries(formData.entries()); // Convierten esos datos en un objeto de JavaScript estándar (loginData), fácil de manejar y enviar.
    // Resultado de loginData:
    // {
    //   username: "JohnDoe",
    //   password: "123456"
    // }

    try {
      const response = await fetchData(
        "/api/v1/users/login", //El endpoint del servidor que maneja la autenticación de usuarios. 
        "POST", //El método HTTP para enviar datos al servidor.
        loginData // El objeto que contiene los datos del formulario (username y password). Son los datos que hemos recogidos y que enviamos al backend.
      ); // Llamamos al backend para autenticar al usuario.

      if (response.token) {
        localStorage.setItem("token", response.token); // Guarda el token.
        localStorage.setItem("user", JSON.stringify(response.user)); // Guarda todo el objeto del usuario.
        localStorage.setItem("username", response.user.username); // Guarda específicamente el username.

        // Mostramos un mensaje de éxito al usuario.
        showSuccessMessage(messageElement, "Inicio de sesión exitoso. Redirigiendo...");
        // Redirigimos al usuario después de 2 segundos a la página principal.
        setTimeout(() => window.navigateTo("/inicio"), 2000);
      }
    } catch (error) {
      // Si hay un error, mostramos un mensaje específico o genérico.
      const errorMessage =
        error?.response?.error || "El email, usuario o contraseña son incorrectos. Vuelve a intentarlo.";
      showErrorMessage(messageElement, errorMessage); // Mostramos un mensaje de error al usuario.
    }
  });

  return form; // Devolvemos el formulario para su renderizado en la página.
};