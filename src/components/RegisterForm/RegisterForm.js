import { fetchData } from "../../utils/api/fetchData";
import "./RegisterForm.css";

export const RegisterForm = (onSuccessfulRegister) => {
  const form = document.createElement("form");
  form.className = "register-form";

  form.innerHTML = `
    <h2>Registrarse</h2>
    <input type="text" name="fullName" placeholder="Nombre Completo" required>
    <input type="text" name="username" placeholder="Nombre de Usuario" required>
    <input type="email" name="email" placeholder="Correo Electrónico" required>
    <input type="password" name="password" placeholder="Contraseña" required>
    <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" required>
    <input type="file" name="avatar" accept="image/*">
    <button type="submit">Registrarse</button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    try {
      const response = await fetchData("/api/v1/users/register", "POST", userData);
      if (response.message === "Usuario registrado exitosamente") {
        alert("Te has registrado correctamente, ya puedes iniciar sesión :)");
        onSuccessfulRegister(); // Esto mostrará el formulario de login
      }
    } catch (error) {
      alert("Error en el registro: " + error.message);
    }
  });

  return form;
};