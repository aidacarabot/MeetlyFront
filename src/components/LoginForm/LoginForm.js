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
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData.entries());

    try {
      const response = await fetchData("/api/v1/users/login", "POST", loginData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        alert("Has iniciado sesión correctamente");
        window.navigateTo("/"); // Redirige al usuario a la página principal
      }
    } catch (error) {
      alert("Error en el inicio de sesión: " + error.message);
    }
  });

  return form;
};