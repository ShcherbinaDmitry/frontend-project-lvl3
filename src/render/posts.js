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

const makeLink = (href, id, title) => {
  const link = document.createElement('a');
  link.setAttribute('href', href);
  link.setAttribute('data-id', id);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener norefferer');
  link.textContent = title;

  return link;
};

const makeListItem = (post, viewMsg) => {
  const postItem = document.createElement('li');
  postItem.classList.add('list-group-item', 'border-0', 'border-end-0', 'd-flex', 'justify-content-between', 'align-items-start');

  const postLink = makeLink(post.link, post.id, post.title);
  postItem.appendChild(postLink);

  const postViewBtn = makeBtn(post.id, viewMsg);
  postItem.appendChild(postViewBtn);

  return postItem;
};

export default ({ postsContainer }, posts, i18nInstance) => {
  console.log('Render posts');
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
  const postListItems = sortedPosts.map((post) => makeListItem(post, viewMsg));

  postList.append(...postListItems);
  postCard.appendChild(postList);
  postsContainer.replaceChildren(postCard);
};
