// src/components/RegisterForm/RegisterForm.js
import { fetchData } from "../../utils/api/fetchData";
import { showError, clearErrors, showSuccessMessage } from "../../utils/functions/errorHandling";
import "./RegisterForm.css";

export const RegisterForm = (onSuccessfulRegister) => {
  const form = document.createElement("form");
  form.className = "register-form";

  form.innerHTML = `
    <h2>Registrarse</h2>
    <div class="form-group">
      <input type="text" name="fullName" placeholder="Nombre Completo" required>
      <p class="error-message" data-for="fullName"></p>
    </div>
    <div class="form-group">
      <input type="text" name="username" placeholder="Nombre de Usuario" required>
      <p class="error-message" data-for="username"></p>
    </div>
    <div class="form-group">
      <input type="email" name="email" placeholder="Correo Electrónico" required>
      <p class="error-message" data-for="email"></p>
    </div>
    <div class="form-group">
      <input type="password" name="password" placeholder="Contraseña" required>
      <p class="error-message" data-for="password"></p>
    </div>
    <div class="form-group">
      <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" required>
      <p class="error-message" data-for="confirmPassword"></p>
    </div>
    <button type="submit">Registrarse</button>
    <p class="error-message general-error"></p>
    <p class="success-message" style="display: none;"></p>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(form);

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    if (userData.password !== userData.confirmPassword) {
      showError(form, 'confirmPassword', "Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetchData("/api/v1/users/register", "POST", userData);
      if (response.message === "Usuario registrado exitosamente") {
        showSuccessMessage(form, "Te has registrado correctamente, ya puedes iniciar sesión");
        setTimeout(() => {
          onSuccessfulRegister();
        }, 2000);
      }
    } catch (error) {
      console.error("Error completo:", error); // Para depuración
      if (error.response) {
        const errorData = error.response;
        if (errorData.error === "El usuario o email ya existe") {
          showError(form, 'username', "El nombre de usuario o email ya está en uso");
          showError(form, 'email', "El nombre de usuario o email ya está en uso");
        } else if (errorData.error === "Formato de email no válido") {
          showError(form, 'email', errorData.error);
        } else {
          showError(form, 'general-error', errorData.error || "Error en el registro");
        }
      } else {
        showError(form, 'general-error', "Error en el registro. Por favor, intenta de nuevo.");
      }
    }
  });

  return form;
};