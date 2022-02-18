export default (elements, i18nInstance) => (path, value) => {
  const {
    input,
    form,
    postsContainer,
    feedsContainer,
    feedbackContainer,
    body,
    modal,
    modalTitle,
    modalBody,
    modalFooter,
    modalCloseBtn,
  } = elements;

  const closeModal = () => {
    body.style.cssText = '';
    body.classList.remove('modal-open');

    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.ariaModal = 'false';
    modal.ariaHidden = 'true';

    body.removeChild(body.lastChild);
  };

  const showModal = (event, post) => {
    body.style.cssText = 'overflow:hidden; padding-right: 0px';
    body.classList.add('modal-open');

    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');

    body.appendChild(modalBackdrop);

    modal.classList.add('show');
    modal.style.display = 'block';
    modal.ariaModal = 'true';
    modal.ariaHidden = 'false';

    modalTitle.textContent = post.title;
    modalBody.textContent = post.description;

    modalFooter.setAttribute('href', post.link);

    modalCloseBtn.forEach((btn) => btn.addEventListener('click', closeModal));
  };

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
      itemTitle.textContent = feed.title;
      listItem.appendChild(itemTitle);

      const itemDescription = document.createElement('p');
      itemDescription.classList.add('m0', 'small', 'text-black-50');
      itemDescription.textContent = feed.description;
      listItem.appendChild(itemDescription);

      feedList.appendChild(listItem);
    });

    feedCard.appendChild(feedList);

    feedsContainer.replaceChildren(feedCard);
  };

  const renderPosts = (postData, watchedPosts = []) => {
    const postCard = document.createElement('div');
    postCard.classList.add('card', 'border-0');

    const postCardBody = document.createElement('div');
    postCardBody.classList.add('card-body');

    const postTitle = document.createElement('h2');
    postTitle.classList.add('card-title', 'h4');
    postTitle.textContent = i18nInstance.t('headers.posts');
    postCardBody.appendChild(postTitle);
    postCard.appendChild(postCardBody);

    const postList = document.createElement('ul');
    postList.classList.add('list-group', 'border-0', 'rounded-0');

    postData.forEach((post) => {
      const postItem = document.createElement('li');
      postItem.classList.add('list-group-item', 'border-0', 'border-end-0', 'd-flex', 'justify-content-between', 'align-items-start');

      const postLink = document.createElement('a');

      postLink.setAttribute('href', post.link);
      postLink.setAttribute('data-id', post.id);
      postLink.setAttribute('target', '_blank');
      postLink.setAttribute('rel', 'noopener norefferer');
      postLink.textContent = post.title;
      if (watchedPosts.includes(post.id)) {
        postLink.classList.remove('fw-bold');
        postLink.classList.add('fw-normal', 'link-secondary');
      } else {
        postLink.classList.add('fw-bold');
      }

      postLink.addEventListener('click', () => {
        if (!watchedPosts.includes(post.id)) {
          watchedPosts.push(post.id);
          renderPosts(postData, watchedPosts);
        }
      });

      const postViewBtn = document.createElement('button');
      postViewBtn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      postViewBtn.setAttribute('type', 'button');
      postViewBtn.setAttribute('data-id', post.id);
      postViewBtn.setAttribute('data-bs-toggle', 'modal');
      postViewBtn.setAttribute('data-bs-target', '#modal');
      postViewBtn.textContent = i18nInstance.t('headers.viewBtn');
      postViewBtn.addEventListener('click', (e) => {
        showModal(e, post);
        if (!watchedPosts.includes(post.id)) {
          watchedPosts.push(post.id);
          renderPosts(postData, watchedPosts);
        }
      });

      postItem.appendChild(postLink);
      postItem.appendChild(postViewBtn);

      postList.appendChild(postItem);
    });

    postCard.appendChild(postList);

    postsContainer.replaceChildren(postCard);
  };

  const renderInfoMsg = (msg) => {
    feedbackContainer.textContent = 'Something happened!';
    if (msg !== 'error') {
      feedbackContainer.classList.add('text-success');
      feedbackContainer.classList.remove('text-danger');
    } else {
      feedbackContainer.classList.remove('text-success');
      feedbackContainer.classList.add('text-danger');
    }
  };

  const renderIsValid = (inputEl, val) => {
    if (val === true) {
      inputEl.classList.remove('is-invalid');
    } else {
      inputEl.classList.add('is-invalid');
    }
  };

  switch (path) {
    case 'processState':
      break;
    case 'isValid':
      renderIsValid(input, value);
      break;
    case 'feeds':
      renderFeeds(value);
      renderInfoMsg(value);
      break;
    case 'posts':
      renderPosts(value);
      // const links = document.querySelectorAll('a');
      // links.forEach((link) => {
      //   link.addEventListener('click', (e) => {
      //     const { id } = e.target.dataset;
      //     value.find((item) => item.id === id).watched = true;
      //     renderPosts(value);
      //   });
      // });
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
