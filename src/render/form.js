export default (elements, { formState }) => {
  const { form, input, submitBtn } = elements;
  if (formState === 'loading') {
    submitBtn.setAttribute('disabled', 'true');
    input.focus();
    form.value = '';
    form.reset();

    return;
  }

  if (formState === 'submitted') {
    input.classList.remove('is-invalid');
  }

  if (formState === 'ValidationError') {
    input.classList.add('is-invalid');
  }

  submitBtn.removeAttribute('disabled');
};
