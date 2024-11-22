
import { fetchData } from "../../utils/api/fetchData";
import "./LoginForm.css";

export const LoginForm = () => {
  const form = document.createElement("form");
  form.className = "login-form";

  form.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <input type="text" name="usernameOrEmail" placeholder="Nombre de Usuario o Email" required>
    <input type="password" name="password" placeholder="Contraseña" required>
    <button type="submit">Iniciar Sesión</button>
    <div id="message" style="display: none;"></div>
  `;

  const messageElement = form.querySelector('#message');

  const showMessage = (message, isError = false) => {
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.className = isError ? 'error-message' : 'success-message';
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageElement.style.display = 'none';

    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData.entries());

    try {
      const response = await fetchData("/api/v1/users/login", "POST", loginData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        showMessage("Inicio de sesión exitoso. Redirigiendo...");
        setTimeout(() => {
          window.location.href = "/inicio";
        }, 2000); // Espera 2 segundos antes de redirigir
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      showMessage("Usuario o contraseña incorrectos", true);
    }
  });

  return form;
};