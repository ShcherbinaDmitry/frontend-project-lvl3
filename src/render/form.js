export default ({ form, input, submitBtn }, value) => {
  if (value === 'loading') {
    submitBtn.setAttribute('disabled', 'true');
  }

  if (value === 'submitted') {
    input.classList.remove('is-invalid');
    input.focus();

    form.reset();

    submitBtn.removeAttribute('disabled');
  }

  if (value === 'error') {
    input.classList.add('is-invalid');

    submitBtn.removeAttribute('disabled');
  }
};
