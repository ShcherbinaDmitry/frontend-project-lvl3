import * as yup from 'yup';
import i18n from 'i18next';
import _ from 'lodash';
import view from './view.js';
import resources from './locales/index.js';
import loadFeed from './loadFeed.js';
import updatePosts from './updatePosts.js';

const validateUrl = (url, feeds) => {
  const feedUrls = feeds.map((feed) => feed.url);
  const validationSchema = yup.string().url().required().notOneOf(feedUrls, 'already exists');

  return validationSchema.validate(url);
};

export default () => {
  // Default i18n setup
  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });

  // Initial state
  const state = {
    formState: 'filling',
    isValid: true,
    feeds: [],
    posts: [],
    readPosts: new Set(),
    activeModalId: null,
    feedback: null,
    updatePostsTimeout: 5000,
    language: defaultLanguage,
  };

  // Basic elements
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    submitBtn: document.querySelector('button[type=submit]'),
    feedbackContainer: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalFooter: document.querySelector('.modal-footer a'),
  };

  const watchedState = view(state, elements, i18nInstance);

  // Validate and subscribe to RSS, load posts
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rssData = new FormData(e.target);
    const url = rssData.get('url').trim();
    console.log('Form data');
    console.log(url);
    elements.form.reset();
    console.log(url);

    validateUrl(url, watchedState.feeds)
      .then(() => {
        watchedState.formState = 'loading';

        return loadFeed(url);
      })
      .then(({ feed, posts }) => {
        watchedState.formState = 'submitted';
        watchedState.feedback = {
          name: 'success',
          message: 'rss was successfully loaded',
        };

        const feedWithId = {
          ...feed,
          url,
          id: _.uniqueId(),
        };

        const postsWithId = posts
          .map((post) => ({
            ...post,
            feedId: feedWithId.id,
            id: _.uniqueId(),
          }));

        watchedState.feeds.push(feedWithId);
        watchedState.posts.push(...postsWithId);
      })
      .catch((error) => {
        watchedState.formState = error.name;
        watchedState.feedback = error;
      });
  });

  // Update posts every 5 seconds
  updatePosts(watchedState);

  // Choose post to show in modal window
  elements.postsContainer.addEventListener('click', (e) => {
    const { target: { dataset: { id } } } = e;

    if (id) {
      watchedState.activeModalId = id;
      watchedState.readPosts.add(id);
    }
  });
};
