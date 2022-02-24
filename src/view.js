import onChange from 'on-change';

import renderFeedback from './render/feedback';
import renderForm from './render/form';
import renderFeeds from './render/feeds';
import renderPosts from './render/posts';
import renderReadPosts from './render/readPosts';
import renderModal from './render/modal';

export default (state, elements, i18nInstance) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'formState':
        renderForm(elements, value);
        break;
      case 'feeds':
        renderFeeds(elements, value, i18nInstance);
        break;
      case 'posts':
        renderPosts(elements, value, i18nInstance);
        break;
      case 'readPosts':
        renderReadPosts(elements, value);
        break;
      case 'feedback':
        renderFeedback(elements, value, i18nInstance);
        break;
      case 'activeModalId':
        renderModal(elements, state, value);
        break;
      case 'language':
        renderForm(elements, watchedState.form);
        renderFeedback(elements, watchedState.feedback, i18nInstance);
        renderFeeds(elements, watchedState.feeds, i18nInstance);
        renderPosts(elements, watchedState.posts, i18nInstance);
        renderReadPosts(elements, watchedState.readPosts);
        break;
      default:
        break;
    }
  });

  return watchedState;
};
