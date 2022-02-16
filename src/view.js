export default (elements, i18nInstance) => (path, value, previousValue) => {
  const {
    input,
    form,
    posts,
    feeds,
    feedback,
  } = elements;
  console.log(path, value, previousValue);

  const renderError = (errors) => {
    console.log(errors);
  };

  const renderFeeds = (feedData) => {
    form.reset();
    input.focus();

    const feedCard = document.createElement('div');
    feedCard.classList.add('card', 'border-0');

    const feedCardBody = document.createElement('div');
    feedCardBody.classList.add('card-body');

    const feedTitle = document.createElement('h2');
    feedTitle.classList.add('card-title', 'h4');
    feedTitle.textContent = i18nInstance.t('headers.feeds');
    feedCardBody.appendChild(feedTitle);
    feedCard.appendChild(feedCardBody);

    const feedList = document.createElement('ul');
    feedList.classList.add('list-group', 'border-0', 'rounded-0');

    feedData.forEach((feed) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'border-0', 'border-end-0');

      const itemTitle = document.createElement('h3');
      itemTitle.classList.add('h6', 'm-0');
      itemTitle.textContent = feed;
      listItem.appendChild(itemTitle);

      const itemDescription = document.createElement('p');
      itemDescription.classList.add('m0', 'small', 'text-black-50');
      itemDescription.textContent = 'Описание курса';
      listItem.appendChild(itemDescription);

      feedList.appendChild(listItem);
    });

    feedCard.appendChild(feedList);

    feeds.replaceChildren(feedCard);
    console.log(`Feeds: ${feeds}`);
  };

  const renderPosts = (postData) => {
    console.log(`Posts: ${postData}`);
  };

  const renderInfoMsg = (msg) => {
    feedback.textContent = 'Something happened!';
    if (msg !== 'error') {
      elements.feedback.classList.add('text-success');
      elements.feedback.classList.remove('text-danger');
    } else {
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
    }
  };

  switch (path) {
    case 'processState':
      break;
    case 'isValid':
      if (value === true) {
        input.classList.remove('is-invalid');
      } else {
        input.classList.add('is-invalid');
      }
      break;
    case 'feeds':
      renderFeeds(value);
      renderInfoMsg(value);
      break;
    case 'posts':
      renderPosts(value);
      break;
    case 'errors':
      renderError(value);
      renderInfoMsg('error');
      break;
    case 'language':
      break;
    default:
      break;
  }
};
