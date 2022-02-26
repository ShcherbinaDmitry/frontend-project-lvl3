export default ({ input, submitBtn }, { formState }) => {
  if (formState === 'loading') {
    submitBtn.setAttribute('disabled', 'true');
    input.focus();

    return;
  }

  if (formState === 'submitted') {
    input.classList.remove('is-invalid');
  }

  if (formState === 'validationError') {
    input.classList.add('is-invalid');
  }

  submitBtn.removeAttribute('disabled');
};
