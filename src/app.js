import * as yup from 'yup';
import onChange from 'on-change';

const render = (form, input, button) => (path, value, previousValue) => {
  console.log(path, value);
  switch (path) {
    case 'isValid':
      input.classList.toggle('is-invalid');
      break;
    case 'feeds':
      break;
    case 'errors':
      break;
    case 'language':
      break;
    default:
      break;
  }
};

export default () => {
  const schema = yup.object().shape({
    url: yup.string().url().required().nullable(),
  });

  const state = {
    isValid: true,
    feeds: [],
    errors: [],
    language: 'en',
  };

  const form = document.querySelector('.rss-form');
  const input = form.querySelector('#url-input');
  const submitBtn = form.querySelector('button[type=submit]');

  const watchedState = onChange(state, render(form, input, submitBtn));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rssData = new FormData(e.target);

    schema.validate({ url: rssData.get('url') })
      .then((source) => {
        form.reset(); // place that in render
        form.url.focus(); // place that in render
        watchedState.feeds.push(source.url);
        watchedState.isValid = true;
      })
      .catch((error) => {
        watchedState.isValid = false;
        watchedState.errors.push(error);
      }); // place that in render?

    console.log('Submitted!');
  });
};
