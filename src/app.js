import * as yup from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import render from './view';
import resources from './locales/index.js';
import parse from './parse';

export default () => {
  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });

  yup.setLocale({
    mixed: {
      default: 'field_invalid',
    },
    url: (url) => ({ key: 'invalid URL', values: url }),
  });

  const schema = yup.object().shape({
    url: yup.string().url().required(),
  });

  const state = {
    processState: 'filling',
    isValid: true,
    feeds: [],
    posts: [],
    error: null,
    language: defaultLanguage,
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    submitBtn: document.querySelector('button[type=submit]'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
  };

  const watchedState = onChange(state, render(elements, i18nInstance));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(i18nInstance.t('headers.feeds'));

    const rssData = new FormData(e.target);

    schema.validate({ url: rssData.get('url') })
      .then(({ url }) => {
        if (watchedState.feeds.includes(url)) {
          throw new Error('This url was already added');
        }
        watchedState.feeds.push(url);
        const posts = parse(url);
        watchedState.push(posts);
        watchedState.isValid = true;
      })
      .catch((error) => {
        watchedState.errors = error;
        watchedState.isValid = false;
      });
  });
};
