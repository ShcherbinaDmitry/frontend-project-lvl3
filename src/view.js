import onChange from 'on-change';

import renderFeedback from './render/feedback';
import renderForm from './render/form';
import renderFeeds from './render/feeds';
import renderPosts from './render/posts';
import renderModal from './render/modal';

export default (state, elements, i18nInstance) => onChange(state, (path) => {
  switch (path) {
    case 'formState':
      renderForm(elements, state);
      break;
    case 'feeds':
      renderFeeds(elements, state, i18nInstance);
      break;
    case 'posts':
    case 'readPosts':
      renderPosts(elements, state, i18nInstance);
      break;
    case 'feedback':
      renderFeedback(elements, state, i18nInstance);
      break;
    case 'activeModalId':
      renderModal(elements, state);
      break;
    case 'language':
      renderForm(elements, state);
      renderFeedback(elements, state, i18nInstance);
      renderFeeds(elements, state, i18nInstance);
      renderPosts(elements, state, i18nInstance);
      break;
    default:
      break;
  }
});
