export default ({ form, input, submitBtn }, { formState }) => {
  if (formState === 'loading') {
    submitBtn.setAttribute('disabled', 'true');
  }

  if (formState === 'submitted') {
    input.classList.remove('is-invalid');
    input.focus();

    form.reset();

    submitBtn.removeAttribute('disabled');
  }

  if (formState === 'error') {
    input.classList.add('is-invalid');

    submitBtn.removeAttribute('disabled');
  }
};
