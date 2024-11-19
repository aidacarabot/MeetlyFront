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
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetchData("/api/v1/users/register", "POST", formData);
      if (response.message === "Usuario registrado exitosamente") {
        alert("Te has registrado correctamente, ya puedes iniciar sesión :)");
        onSuccessfulRegister();
      }
    } catch (error) {
      alert("Error en el registro: " + error.message);
    }
  });

  return form;
};