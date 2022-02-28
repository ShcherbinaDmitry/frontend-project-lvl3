const makeBtn = (id, msg) => {
  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  btn.setAttribute('type', 'button');
  btn.setAttribute('data-id', id);
  btn.setAttribute('data-bs-toggle', 'modal');
  btn.setAttribute('data-bs-target', '#modal');
  btn.textContent = msg;

  return btn;
};

const makeLink = (href, id, title, classes) => {
  const link = document.createElement('a');
  link.classList.add(...classes);
  link.setAttribute('href', href);
  link.setAttribute('data-id', id);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener norefferer');
  link.textContent = title;

  return link;
};

const makeListItem = (post, viewMsg, readPosts) => {
  const postItem = document.createElement('li');
  postItem.classList.add('list-group-item', 'border-0', 'border-end-0', 'd-flex', 'justify-content-between', 'align-items-start');

  const linkClasses = readPosts.has(post.id) ? ['fw-normal', 'link-secondary'] : ['fw-bold'];
  const postLink = makeLink(post.link, post.id, post.title, linkClasses);
  postItem.appendChild(postLink);

  const postViewBtn = makeBtn(post.id, viewMsg);
  postItem.appendChild(postViewBtn);

  return postItem;
};

export default ({ postsContainer }, { posts, readPosts }, i18nInstance) => {
  const sortedPosts = posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const postCard = document.createElement('div');
  postCard.classList.add('card', 'border-0');

  const postCardBody = document.createElement('div');
  postCardBody.classList.add('card-body');
  postCard.appendChild(postCardBody);

  const postTitle = document.createElement('h2');
  postTitle.classList.add('card-title', 'h4');
  postTitle.textContent = i18nInstance.t('headers.posts');
  postCardBody.appendChild(postTitle);

  const postList = document.createElement('ul');
  postList.classList.add('list-group', 'border-0', 'rounded-0');

  const viewMsg = i18nInstance.t('buttons.view');
  const postListItems = sortedPosts.map((post) => makeListItem(post, viewMsg, readPosts));

  postList.append(...postListItems);
  postCard.appendChild(postList);
  postsContainer.replaceChildren(postCard);
};
