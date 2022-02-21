import * as yup from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import _ from 'lodash';
import render from './view';
import resources from './locales';
import parser from './parser';

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
    feedbackContainer: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    body: document.querySelector('body'),
    modal: document.querySelector('.modal'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalFooter: document.querySelector('.modal-footer a'),
    modalCloseBtn: document.querySelectorAll('[data-bs-dismiss=modal]'),
  };

  const watchedState = onChange(state, render(elements, i18nInstance));

  const customizer = (value, other) => {
    if (value.pubDate.getTime() !== other.pubDate.getTime()) {
      return false;
    }

    return true;
  };

  // eslint-disable-next-line no-unused-vars
  let timerId = setTimeout(function checkFeed() {
    console.log('Timer!');
    watchedState.feeds.forEach((feed) => {
      parser(feed)
        .then(({ posts }) => {
          const oldPosts = watchedState.posts.filter((post) => post.feedId === feed.id);
          const newPosts = _.differenceWith(posts, oldPosts, customizer);
          if (newPosts.length) {
            watchedState.posts = [...newPosts, ...watchedState.posts]
              .sort((a, b) => b.pubDate - a.pubDate);
          }
        }).catch((err) => {
          watchedState.errors = err;
        });
    });

    timerId = setTimeout(checkFeed, 5000);
  }, 5000);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rssData = new FormData(e.target);

    schema.validate({ url: rssData.get('url').trim() })
      .then(({ url }) => {
        if (watchedState.feeds.find((feed) => feed.url === url)) {
          throw new Error('This url was already added');
        }

        const feedObj = {
          url,
          id: _.uniqueId(),
        };

        return parser(feedObj);
      }).then(({ feed, posts }) => {
        watchedState.feeds.push(feed);
        watchedState.posts = [...watchedState.posts, ...posts]
          .sort((a, b) => b.pubDate - a.pubDate);
        watchedState.isValid = true;
      }).catch((error) => {
        console.log(error);
        watchedState.errors = error;
        watchedState.isValid = false;
      });
  });
};
