import { fetchData } from '../../utils/api/fetchData'
import {
  showSuccessMessage,
  showErrorMessage
} from '../../components/Messages/Messages' // Importamos las funciones reutilizables para mensajes.
import './LoginForm.css'

// Renderiza el formulario de inicio de sesión
export const LoginForm = (goToRegister) => {
  const form = document.createElement('form') // Creamos el formulario.
  form.className = 'login-form uiverse-login' // Añadimos clases únicas para estilos y evitar conflictos.

  // Estructura del formulario
  form.innerHTML = `
    <div class="uiverse-card">
      <a class="uiverse-login-title">Log in</a> <!-- Título estilizado -->
      
      <div class="uiverse-inputBox">
        <input 
          type="text" 
          name="usernameOrEmail" 
          required="required" 
          autocomplete="off"
        />
        <span class="uiverse-placeholder">username or email</span> <!-- Placeholder animado -->
      </div>

      <div class="uiverse-inputBox">
        <input 
          type="password" 
          name="password" 
          required="required" 
          autocomplete="off"
        />
        <span class="uiverse-placeholder">password</span> <!-- Placeholder animado -->
      </div>

      <button type="submit" class="uiverse-enter">log in</button> <!-- Botón estilizado -->
      <div id="message" class="message"></div> <!-- Contenedor para mensajes -->

      <p class="uiverse-signup"> <!-- Mensaje para redirigir al registro -->
        Don't have an account? 
        <span id="go-to-register" class="uiverse-link">Register here</span>
      </p>
    </div>
  `

  const messageElement = form.querySelector('#message') // Seleccionamos el contenedor de mensajes.
  const submitButton = form.querySelector('.uiverse-enter') // Seleccionamos el botón de enviar.
  const goToRegisterElement = form.querySelector('#go-to-register') // Seleccionamos el enlace para registrarse.

  //! Redirigir al formulario de registro
  goToRegisterElement.addEventListener('click', () => goToRegister())

  // Añadimos eventos para cambiar el estilo del botón al presionar "Enter".
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitButton.classList.add('uiverse-active') // Añade clase activa.
    }
  })

  form.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      submitButton.classList.remove('uiverse-active') // Elimina clase activa.
    }
  })

  // Maneja el envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault() // Evita el comportamiento predeterminado de recargar la página.

    messageElement.style.display = 'none' // Oculta mensajes previos.

    const formData = new FormData(form) // Recoge los datos del formulario.
    const loginData = Object.fromEntries(formData.entries()) // Convierte los datos en un objeto estándar.

    try {
      const response = await fetchData(
        '/api/v1/users/login', // Endpoint del servidor para autenticación.
        'POST', // Método HTTP.
        loginData // Datos del formulario.
      )

      if (response.token) {
        localStorage.setItem('token', response.token) // Guarda el token.
        localStorage.setItem('user', JSON.stringify(response.user)) // Guarda el objeto usuario.
        localStorage.setItem('username', response.user.username) // Guarda específicamente el nombre de usuario.

        // Mostramos un mensaje de éxito.
        showSuccessMessage(
          messageElement,
          'Logged in successfully! Redirecting to your profile...'
        )
        setTimeout(() => window.navigateTo('/inicio'), 2000) // Redirige tras 2 segundos.
      }
    } catch (error) {
      // Muestra un mensaje de error específico o genérico.
      const errorMessage =
        error?.response?.error ||
        'El email, usuario o contraseña son incorrectos. Vuelve a intentarlo.'
      showErrorMessage(messageElement, errorMessage)
    }
  })

  return form // Devuelve el formulario para ser renderizado.
}
