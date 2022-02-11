import * as yup from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import render from './view';

export default () => {
  const schema = yup.object().shape({
    url: yup.string().url().required(),
  });

  const state = {
    processState: 'filling',
    isValid: true,
    feeds: [],
    error: null,
    language: 'en',
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    submitBtn: document.querySelector('button[type=submit]'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
  };

  const watchedState = onChange(state, render(elements));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rssData = new FormData(e.target);

    schema.validate({ url: rssData.get('url') })
      .then(({ url }) => {
        if (watchedState.feeds.includes(url)) {
          throw new Error('This url was already added');
        }
        watchedState.feeds.push(url);
        watchedState.isValid = true;
      })
      .catch((error) => {
        watchedState.errors = error;
        watchedState.isValid = false;
      });
  });
};
