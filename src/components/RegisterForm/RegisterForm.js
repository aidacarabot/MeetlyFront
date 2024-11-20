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
    <button type="submit">Registrarse</button>
    <div id="error-messages"></div>
    <div id="success-message" style="display: none;"></div>
  `;

  const errorMessages = form.querySelector('#error-messages');
  const successMessage = form.querySelector('#success-message');

  const showSuccessMessage = (message) => {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
      onSuccessfulRegister();
    }, 2000);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessages.innerHTML = '';
    successMessage.style.display = 'none';

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const errors = new Set();

    if (userData.password !== userData.confirmPassword) {
      errors.add("Las contraseñas no coinciden");
    }

    try {
      const response = await fetchData("/api/v1/users/register", "POST", userData);
      if (response.user) {
        showSuccessMessage("Te has registrado correctamente, ya puedes iniciar sesión");
      }
    } catch (error) {
      if (error.response && error.response.error) {
        if (typeof error.response.error === 'string') {
          errors.add(error.response.error);
        } else if (Array.isArray(error.response.error)) {
          error.response.error.forEach(err => errors.add(err));
        }
      }
    }

    if (errors.size > 0) {
      errors.forEach(error => {
        const errorElement = document.createElement('p');
        errorElement.textContent = error;
        errorMessages.appendChild(errorElement);
      });
    }
  });

  return form;
};