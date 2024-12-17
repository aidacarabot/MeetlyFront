import { fetchData } from "../../utils/api/fetchData"; // Importamos la función reutilizable para realizar peticiones al backend.
import { showSuccessMessage, showErrorMessage } from "../../utils/functions/messages"; // Importamos las funciones para mostrar mensajes de éxito y error.
import "./RegisterForm.css";

export const RegisterForm = (onSuccessfulRegister, goToLogin) => {
    // Función que crea y maneja el formulario de registro.
  // Recibe dos argumentos:
  // - `onSuccessfulRegister`: Función que se ejecuta después de un registro exitoso (redirige al login).
  // - `goToLogin`: Función que redirige al formulario de inicio de sesión.
  const form = document.createElement("form"); // Creamos el elemento `<form>` HTML para el formulario de registro.
  form.className = "register-form"; // Añadimos una clase CSS para estilos.

  // Estructura del formulario
  form.innerHTML = `
    <h2>Registrarse</h2>
    <input type="text" name="fullName" placeholder="Nombre Completo" required />
    <input type="text" name="username" placeholder="Nombre de Usuario" required />
    <input type="email" name="email" placeholder="Correo Electrónico" required />
    <input type="password" name="password" placeholder="Contraseña" required />
    <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" required />
    <button type="submit">Registrarse</button>
    <div id="message" class="message"></div> <!-- Contenedor para mensajes -->

    <!-- Enlace para redirigir al inicio de sesión -->
    <p class="small-text">
      ¿Ya tienes una cuenta? <span id="go-to-login" class="link">Inicia Sesión</span>
    </p>
  `;

  const messageElement = form.querySelector("#message"); // Seleccionamos el contenedor donde se mostrarán los mensajes de éxito o error.
  const goToLoginElement = form.querySelector("#go-to-login"); // Seleccionamos el enlace "Inicia Sesión".

  //! Agregamos funcionalidad al enlace "Inicia Sesión":
  goToLoginElement.addEventListener("click", () => goToLogin()); // Cuando el usuario hace clic en el enlace, se ejecuta la función `goToLogin` para redirigir al formulario de inicio de sesión. Se enlaza en el archivo LoginRegister.js.

  //! Manejamos el envío del formulario:
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitamos el comportamiento predeterminado de recargar la página al enviar el formulario.

    messageElement.style.display = "none"; // Ocultamos cualquier mensaje previo para evitar superposición de mensajes.

    const formData = new FormData(form); // Recogemos los datos ingresados en el formulario y los estructuramos como `FormData`.
    const userData = Object.fromEntries(formData.entries()); // Convertimos los datos del formulario en un objeto de JavaScript para facilitar su envío al backend.
    const errors = []; // Creamos un array para almacenar posibles errores de validación local.

    //! Validación local: verificamos si las contraseñas coinciden.
    if (userData.password !== userData.confirmPassword) {
      errors.push("Las contraseñas no coinciden."); // Si las contraseñas no coinciden, añadimos un error al array de errores.
    }

    // Si hay errores, los mostramos al usuario y detenemos el envío del formulario.
    if (errors.length > 0) {
      showErrorMessage(messageElement, errors.join(" ")); // Mostramos los errores concatenados en el contenedor de mensajes.
      return; // Salimos de la función, no se envía nada al backend.
    }

     //! Intentamos enviar los datos al backend:
    try {
      const response = await fetchData("/api/v1/users/register", "POST", userData); // Llamamos al backend para registrar al usuario con los datos recolectados en userData.

      if (response.user) {
        // Si el registro es exitoso, mostramos un mensaje de éxito al usuario.
        showSuccessMessage(
          messageElement,
          "Registro exitoso. Redirigiendo al inicio de sesión..."
        );

        // Después de 2 segundos, ejecutamos la función `onSuccessfulRegister` para redirigir al login.
        setTimeout(() => onSuccessfulRegister(), 2000);
      }
    } catch (error) {
      //! Si hay un error en la respuesta del backend:
      const errorMessage =
        error?.response?.error || "El usuario o correo ya están en uso. Utiliza otros o inicia sesión.";
        // Capturamos el mensaje del backend, o usamos un mensaje genérico si no está disponible.
      showErrorMessage(messageElement, errorMessage); // Mostramos el mensaje de error al usuario en el contenedor.
    }
  });

  return form; // Devolvemos el formulario para su renderizado en la página.
};