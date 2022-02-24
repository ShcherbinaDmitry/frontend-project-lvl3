const hideModal = (elements) => {
  const { body, modal } = elements;
  body.style.cssText = '';
  body.classList.remove('modal-open');

  modal.classList.remove('show');
  modal.style.display = 'none';
  modal.ariaModal = 'false';
  modal.ariaHidden = 'true';

  body.removeChild(body.lastChild);
};

const showModal = (elements, { title, description, link }) => {
  const {
    body,
    modal,
    modalTitle,
    modalBody,
    modalFooter,
  } = elements;

  body.style.cssText = 'overflow:hidden; padding-right: 0px';
  body.classList.add('modal-open');

  const modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');

  body.appendChild(modalBackdrop);

  modal.classList.add('show');
  modal.style.display = 'block';
  modal.ariaModal = 'true';
  modal.ariaHidden = 'false';

  modalTitle.textContent = title;
  modalBody.textContent = description;

  modalFooter.setAttribute('href', link);

  body.addEventListener('click', (e) => {
    console.log(e.target);

    if (e.target.dataset.bsDismiss === 'modal') {
      hideModal(elements);
    }
  });
};

export default (elements, { posts }, postId) => {
  console.log('Render modal');
  if (postId) {
    const activePost = posts.find(({ id }) => id === postId);
    showModal(elements, activePost);
  } else {
    hideModal(elements);
  }
};

// export { showModal, hideModal };
