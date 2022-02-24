const makeListItem = (feed) => {
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

  return listItem;
};

export default ({ feedsContainer }, feeds, i18nInstance) => {
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
  const feedListItems = feeds.map(makeListItem);
  feedList.append(...feedListItems.reverse());

  feedCard.appendChild(feedList);
  feedsContainer.replaceChildren(feedCard);
};
