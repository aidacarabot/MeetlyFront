import { fetchData } from "../../utils/api/fetchData";
import { showMessage } from "../../utils/functions/feedback"; 
import "./LoginForm.css";

// Renderiza el formulario de inicio de sesión
export const LoginForm = () => {
  const form = document.createElement("form");
  form.className = "login-form";

  // Estructura del formulario
  form.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <input type="text" name="usernameOrEmail" placeholder="Nombre de Usuario o Email" required />
    <input type="password" name="password" placeholder="Contraseña" required />
    <button type="submit">Iniciar Sesión</button>
    <div id="message" class="message"></div> <!-- Contenedor para mensajes -->
  `;

  const messageElement = form.querySelector("#message");

  // Maneja el envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageElement.style.display = "none"; // Oculta cualquier mensaje previo.

    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData.entries());

    try {
      const response = await fetchData("/api/v1/users/login", "POST", loginData);

      if (response.token) {
        // Guarda el token y el usuario en localStorage.
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Muestra un mensaje de éxito y redirige.
        showMessage(messageElement, "Inicio de sesión exitoso. Redirigiendo...", false);
        setTimeout(() => window.navigateTo("/inicio"), 2000);
      }
    } catch (error) {
      // Maneja los errores del servidor o muestra un mensaje genérico.
      const errorMessage = error?.response?.error || "El email, usuario o contraseña son incorrectos. Vuelve a intentarlo.";
      showMessage(messageElement, errorMessage, true);
    }
  });

  return form;
};