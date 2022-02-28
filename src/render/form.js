export default ({ form, input, submitBtn }, { formState }) => {
  if (formState === 'loading') {
    submitBtn.setAttribute('disabled', 'true');
    input.focus();
    form.reset();

    return;
  }

  if (formState === 'submitted') {
    input.classList.remove('is-invalid');
  }

  if (formState === 'error') {
    input.classList.add('is-invalid');
  }

  submitBtn.removeAttribute('disabled');
};
