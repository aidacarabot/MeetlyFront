export const showError = (form, field, message) => {
  const errorElement = form.querySelector(`[data-for="${field}"]`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
};

export const clearErrors = (form) => {
  form.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
};

export const showSuccessMessage = (form, message) => {
  const successElement = form.querySelector('.success-message');
  if (successElement) {
    successElement.textContent = message;
    successElement.style.display = 'block';
  }
};