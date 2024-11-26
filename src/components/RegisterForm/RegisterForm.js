import { fetchData } from "../../utils/api/fetchData";
import { showMessage } from "../../utils/functions/feedback"; // Función para mostrar mensajes.
import "./RegisterForm.css";

export const RegisterForm = (onSuccessfulRegister, goToLogin) => {
  const form = document.createElement("form");
  form.className = "register-form";

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

  const messageElement = form.querySelector("#message");
  const goToLoginElement = form.querySelector("#go-to-login");

  // Agregar funcionalidad al enlace de "Inicia Sesión"
  goToLoginElement.addEventListener("click", () => goToLogin());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageElement.style.display = "none"; // Oculta mensajes previos.

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const errors = [];

    // Validación local: contraseñas coinciden
    if (userData.password !== userData.confirmPassword) {
      errors.push("Las contraseñas no coinciden.");
    }

    if (errors.length > 0) {
      showMessage(messageElement, errors.join(" "), true);
      return;
    }

    try {
      const response = await fetchData("/api/v1/users/register", "POST", userData);

      if (response.user) {
        showMessage(messageElement, "Registro exitoso. Redirigiendo al inicio de sesión...", false);
        setTimeout(() => onSuccessfulRegister(), 2000);
      }
    } catch (error) {
      // Manejo de errores del servidor o mensaje específico.
      const errorMessage = error?.response?.error || "El usuario o correo ya están en uso. Utiliza otros o inicia sesión.";
      showMessage(messageElement, errorMessage, true);
    }
  });

  return form;
};