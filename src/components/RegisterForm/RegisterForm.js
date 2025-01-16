import { fetchData } from '../../utils/api/fetchData' // Importamos la función reutilizable para realizar peticiones al backend.
import {
  showSuccessMessage,
  showErrorMessage
} from '../../components/Messages/Messages' // Importamos las funciones para mostrar mensajes.
import './RegisterForm.css'

export const RegisterForm = (onSuccessfulRegister, goToLogin) => {
  const form = document.createElement('form') // Creamos el formulario principal.
  form.className = 'uiverse-register-form uiverse-card' // Clases consistentes con el diseño de LoginForm.

  // Estructura del formulario
  form.innerHTML = `
    <a class="uiverse-title">Registrarse</a> <!-- Título del formulario -->
    
    <div class="uiverse-inputBox">
      <input 
        required 
        type="text" 
        name="fullName" 
        class="uiverse-input" 
        placeholder=" " 
        autocomplete="off"
      />
      <span class="uiverse-placeholder">Nombre Completo</span>
    </div>

    <div class="uiverse-inputBox">
      <input 
        required 
        type="text" 
        name="username" 
        class="uiverse-input" 
        placeholder=" " 
        autocomplete="off"
      />
      <span class="uiverse-placeholder">Nombre de Usuario</span>
    </div>

    <div class="uiverse-inputBox">
      <input 
        required 
        type="email" 
        name="email" 
        class="uiverse-input" 
        placeholder=" " 
        autocomplete="off"
      />
      <span class="uiverse-placeholder">Correo Electrónico</span>
    </div>

    <div class="uiverse-inputBox">
      <input 
        required 
        type="password" 
        name="password" 
        class="uiverse-input" 
        placeholder=" " 
        autocomplete="off"
      />
      <span class="uiverse-placeholder">Contraseña</span>
    </div>

    <div class="uiverse-inputBox">
      <input 
        required 
        type="password" 
        name="confirmPassword" 
        class="uiverse-input" 
        placeholder=" " 
        autocomplete="off"
      />
      <span class="uiverse-placeholder">Confirmar Contraseña</span>
    </div>

    <button type="submit" class="uiverse-submit">Registrar</button> <!-- Botón estilizado -->

    <p class="uiverse-signin">
      ¿Ya tienes una cuenta? 
      <span id="go-to-login" class="uiverse-link">Inicia Sesión</span> <!-- Enlace para redirigir -->
    </p>

    <div id="message" class="message"></div> <!-- Contenedor para mensajes -->
  `

  // Seleccionamos elementos necesarios
  const messageElement = form.querySelector('#message')
  const goToLoginElement = form.querySelector('#go-to-login')

  //! Redirigir al formulario de inicio de sesión
  goToLoginElement.addEventListener('click', () => goToLogin())

  //! Manejo del envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault() // Evita la recarga de la página.

    const formData = new FormData(form) // Recoge los datos del formulario.
    const userData = Object.fromEntries(formData.entries()) // Convierte los datos a un objeto estándar.
    const errors = [] // Array para almacenar errores de validación local.

    //! Validación de contraseñas
    if (userData.password !== userData.confirmPassword) {
      errors.push('Las contraseñas no coinciden.')
    }

    if (errors.length > 0) {
      showErrorMessage(messageElement, errors.join(' '))
      return
    }

    //! Intento de registro en el backend
    try {
      const response = await fetchData(
        '/api/v1/users/register',
        'POST',
        userData
      )

      if (response.user) {
        showSuccessMessage(
          messageElement,
          'Registro exitoso. Redirigiendo al inicio de sesión...'
        )
        setTimeout(() => onSuccessfulRegister(), 2000)
      }
    } catch (error) {
      const errorMessage =
        error?.response?.error ||
        'El usuario o correo ya están en uso. Intenta con otros.'
      showErrorMessage(messageElement, errorMessage)
    }
  })

  return form // Devolvemos el formulario.
}
