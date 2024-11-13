import { fetchData } from "../../utils/api/fetchData"; // Usamos fetchData
import "./RegisterForm.css"; // Estilos del formulario

export const RegisterForm = () => {
  const formDiv = document.createElement("div");
  formDiv.className = "register-form"; // Asignamos clase para estilos

  // Estructura del formulario
  formDiv.innerHTML = `
    <h2>Registrarse</h2>
    <form id="register-form">
      <input type="text" id="username" placeholder="Nombre de usuario" required />
      <input type="email" id="email" placeholder="Correo electrónico" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <input type="url" id="avatar" placeholder="Avatar (URL opcional)" />
      <button type="submit" class="btn-primary">Registrarse</button>
    </form>
    <p id="register-message" class="message"></p>
  `;

  // Manejador de envío del formulario
  const form = formDiv.querySelector("#register-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitamos el comportamiento por defecto

    // Capturamos los valores de los campos
    const username = form.querySelector("#username").value;
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const avatar = form.querySelector("#avatar").value || null;

    // Creamos el objeto del usuario
    const userData = { username, email, password, avatar, rol: "user" };

    try {
      // Enviamos la solicitud POST a la API
      const response = await fetchData("/api/v1/users/register", "POST", userData);

      const message = formDiv.querySelector("#register-message");

      if (response) {
        message.textContent = "Registro exitoso. ¡Inicia sesión!";
        message.classList.add("success");
      } else {
        message.textContent = "Error al registrarse. Inténtalo de nuevo.";
        message.classList.add("error");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  });
};