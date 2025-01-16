import { createPage } from '../../utils/functions/createPage'
import { fetchData } from '../../utils/api/fetchData'
import {
  showSuccessMessage,
  showErrorMessage
} from '../../components/Messages/Messages'
import './CreateEvent.css'

export const CreateEvent = () => {
  const page = createPage('create-event')

  const modal = document.createElement('div')
  modal.className = 'merenge-modal'

  modal.innerHTML = `
    <div class="merenge-modal__header">
      <span class="merenge-modal__title">Crear Evento</span>
    </div>

    <form class="merenge-modal__body merenge-create-event-form">
      <div class="merenge-input">
        <label class="merenge-input__label">Título del Evento</label>
        <input class="merenge-input__field" type="text" name="title" required />
      </div>

      <div class="merenge-input">
        <label class="merenge-input__label">Descripción</label>
        <textarea class="merenge-input__field merenge-input__field--textarea" name="description" required></textarea>
      </div>

      <div class="merenge-input">
        <label class="merenge-input__label">Ubicación</label>
        <input class="merenge-input__field" type="text" name="location" required />
      </div>

      <div class="merenge-input">
        <label class="merenge-input__label">Fecha</label>
        <input class="merenge-input__field" type="datetime-local" name="date" required />
      </div>

      <div class="merenge-input">
        <label class="merenge-input__label">Imagen</label>
        <input class="merenge-input__field" type="file" name="img" accept="image/*" required />
      </div>

      <div class="merenge-modal__footer">
        <button type="submit" class="merenge-button merenge-button--primary">Crear Evento</button>
      </div>
    </form>

    <div id="merenge-messages" class="merenge-messages"></div>
  `

  const form = modal.querySelector('.merenge-create-event-form')
  const messagesDiv = modal.querySelector('#merenge-messages')

  // Manejador de envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    messagesDiv.innerHTML = ''

    const formData = new FormData(form)

    try {
      const response = await fetchData('/api/v1/events', 'POST', formData, {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })

      showSuccessMessage(messagesDiv, 'Evento creado exitosamente.')
      form.reset()
      setTimeout(() => window.navigateTo('/inicio'), 2000)
    } catch (error) {
      console.error('Error al crear el evento:', error)
      showErrorMessage(
        messagesDiv,
        error.message || 'Hubo un problema al crear el evento.'
      )
    }
  })

  page.appendChild(modal)
  return page
}
