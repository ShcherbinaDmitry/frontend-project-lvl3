import * as yup from 'yup';
import i18n from 'i18next';
import _ from 'lodash';
import view from './view';
import resources from './locales';
import loadFeed from './loadFeed';
import updatePosts from './updatePosts';

const submitHandler = (e, state) => {

};

const modalHandler = (e, state) => {

};

export default () => {
  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  }).then(() => {
    // yup.setLocale({
    //   string: {
    //     url: 'notValidUrl',
    //   },
    //   mixed: {
    //     notOneOf: 'alreadyExists',
    //   },
    //   required: 'isEmptry',
    // });
  });

  // yup.setLocale({
  //   mixed: {
  //     default: 'field_invalid',
  //   },
  //   url: (url) => ({ key: 'invalid URL', values: url }),
  // });

  // const getUrlSchema = () => yup.string().url().required();
  const basicSchema = yup.string().url().required();

  const validateUrl = (url, feeds) => {
    const feedUrls = feeds.map((feed) => feed.url);
    const validationSchema = basicSchema.notOneOf(feedUrls);

    return validationSchema.validate(url);
  };

  const state = {
    formState: 'filling',
    isValid: true,
    feeds: [],
    posts: [],
    readPosts: [],
    activeModalId: null,
    feedback: null,
    updatePostsTimeout: 5000,
    language: defaultLanguage,
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    submitBtn: document.querySelector('button[type=submit]'),
    feedbackContainer: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    body: document.querySelector('body'),
    modal: document.querySelector('.modal'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalFooter: document.querySelector('.modal-footer a'),
  };

  const watchedState = view(state, elements, i18nInstance);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rssData = new FormData(e.target);
    const url = rssData.get('url').trim();

    validateUrl(url, watchedState.feeds)
      .then((validUrl) => {
        watchedState.formState = 'loading';

        const feed = {
          url: validUrl,
          id: _.uniqueId(),
        };

        return loadFeed(feed);
      })
      .then(({ feed, posts }) => {
        watchedState.formState = 'submitted';
        watchedState.feedback = {
          name: 'success',
          message: i18nInstance.t('feedbackMsg.success'),
        };

        const postsWithId = posts
          .map((post) => ({
            ...post,
            id: _.uniqueId(),
          }));

        watchedState.feeds.push(feed);
        watchedState.posts.push(...postsWithId);
      })
      .catch((error) => {
        console.log('Found error!');
        console.log(error);
        console.log(error.name);
        console.log(error.message);

        if (error.name === 'ValidationError') {
          watchedState.formState = 'error';
        }

        watchedState.feedback = error;
      });
  });

  // updatePosts(watchedState);

  elements.postsContainer.addEventListener('click', (e) => {
    const { target: { dataset: { id } } } = e;

    if (id) {
      watchedState.activeModalId = id;
      watchedState.readPosts.push(id);
    }
  });
};
