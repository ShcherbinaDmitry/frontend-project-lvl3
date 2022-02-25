import onChange from 'on-change';

import renderFeedback from './render/feedback';
import renderForm from './render/form';
import renderFeeds from './render/feeds';
import renderPosts from './render/posts';
import renderModal from './render/modal';

export default (state, elements, i18nInstance) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'formState':
        renderForm(elements, watchedState);
        break;
      case 'feeds':
        renderFeeds(elements, watchedState, i18nInstance);
        break;
      case 'posts':
      case 'readPosts':
        renderPosts(elements, watchedState, i18nInstance);
        break;
      case 'feedback':
        renderFeedback(elements, watchedState, i18nInstance);
        break;
      case 'activeModalId':
        renderModal(elements, watchedState);
        break;
      case 'language':
        renderForm(elements, watchedState);
        renderFeedback(elements, watchedState, i18nInstance);
        renderFeeds(elements, watchedState, i18nInstance);
        renderPosts(elements, watchedState, i18nInstance);
        break;
      default:
        break;
    }
  });

  return watchedState;
};
