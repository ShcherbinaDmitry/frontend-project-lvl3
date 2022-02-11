export default (elements) => (path, value, previousValue) => {
  console.log(path, value, previousValue);

  const renderError = (errors) => {
    console.log(errors);
  };

  const renderFeeds = (feeds) => {
    elements.form.reset();
    elements.input.focus();
    console.log(`Feeds: ${feeds}`);
  };

  const renderPosts = (posts) => {
    console.log(`Posts: ${posts}`);
  };

  switch (path) {
    case 'processState':
      break;
    case 'isValid':
      if (value === true) {
        elements.input.classList.remove('is-invalid');
      } else {
        elements.input.classList.add('is-invalid');
      }
      break;
    case 'feeds':
      renderFeeds(value);
      renderPosts(value);
      break;
    case 'errors':
      renderError(value);
      break;
    case 'language':
      break;
    default:
      break;
  }
};
