export default (elements, state) => {
  const { modalTitle, modalBody, modalFooter } = elements;
  const { posts, activeModalId } = state;

  if (activeModalId) {
    const activePost = posts.find(({ id }) => id === activeModalId);

    modalTitle.textContent = activePost.title;
    modalBody.textContent = activePost.description;
    modalFooter.setAttribute('href', activePost.link);
  }
};
