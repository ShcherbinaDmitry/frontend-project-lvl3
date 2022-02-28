export default (elements, { feedback }, i18nInstance) => {
  const { feedbackContainer } = elements;

  let message = '';
  console.log(`Feedback message: ${feedback?.message}`);

  switch (feedback?.message) {
    case 'rss was successfully loaded':
      message = i18nInstance.t('feedbackMsg.success');
      break;
    case 'this must be a valid URL':
      message = i18nInstance.t('feedbackMsg.errors.notValidUrl');
      break;
    case 'this is a required field':
      message = i18nInstance.t('feedbackMsg.errors.isEmpty');
      break;
    case 'already exists':
      message = i18nInstance.t('feedbackMsg.errors.alreadyExists');
      break;
    case 'rss parsing error':
      message = i18nInstance.t('feedbackMsg.errors.noValidRss');
      break;
    case 'Network Error':
      message = i18nInstance.t('feedbackMsg.errors.networkError');
      break;
    default:
      message = i18nInstance.t('feedbackMsg.errors.unknownError');
      break;
  }

  feedbackContainer.textContent = message;

  if (feedback?.name === 'success') {
    feedbackContainer.classList.add('text-success');
    feedbackContainer.classList.remove('text-danger');
  } else {
    feedbackContainer.classList.add('text-danger');
    feedbackContainer.classList.remove('text-success');
  }
};
