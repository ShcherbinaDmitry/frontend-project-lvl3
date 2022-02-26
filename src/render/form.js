export default ({ form, input, submitBtn }, { formState }) => {
  if (formState === 'loading') {
    submitBtn.setAttribute('disabled', 'true');

    return;
  }

  if (formState === 'submitted') {
    input.classList.remove('is-invalid');
  }

  if (formState === 'validationError') {
    input.classList.add('is-invalid');
  }

  input.focus();
  form.reset();
  submitBtn.removeAttribute('disabled');
};
