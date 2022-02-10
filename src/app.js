import * as yup from 'yup';
import onChange from 'on-change';

const render = (element) => (path, value, previousValue) => {
  console.log(path, value);
  switch (path) {
    case 'isValid':
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

  const watchedState = onChange(state, render(form));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rssData = new FormData(e.target);

    schema.validate({ url: rssData.get('url') })
      .then((source) => {
        form.reset();
        form.url.focus(); // place that in render
        watchedState.feeds.push(source.url);
      })
      .catch((error) => {
        watchedState.errors.push(error);
      });

    console.log('Submitted!');
  });
};
