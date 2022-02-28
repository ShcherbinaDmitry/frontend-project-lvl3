export default (elements, { formState }) => {
  const { form, input, submitBtn } = elements;
  if (formState === 'loading') {
    submitBtn.setAttribute('disabled', 'true');
    input.focus();
    input.value = '';
    input.setAttribute('readonly', 'true');
    form.reset();

    return;
  }

  if (formState === 'submitted') {
    input.classList.remove('is-invalid');
  }

  if (formState === 'ValidationError') {
    input.classList.add('is-invalid');
  }

  input.removeAttribute('readonly');
  submitBtn.removeAttribute('disabled');
};
