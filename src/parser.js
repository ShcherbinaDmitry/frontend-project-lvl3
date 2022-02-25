export default (feedXML, feedObj) => {
  const parser = new DOMParser();
  const feedData = parser.parseFromString(feedXML, 'text/xml');
  const parseError = feedData.querySelector('parsererror');

  if (parseError) {
    throw new Error('rss parsing error');
  }

  const feed = {
    ...feedObj,
    title: feedData.querySelector('title').textContent,
    description: feedData.querySelector('description').textContent,
  };

  const items = feedData.querySelectorAll('item');
  const posts = Array.from(items).map((item) => ({
    feedId: feed.id,
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
    pubDate: new Date(item.querySelector('pubDate').textContent),
  }));

  return { feed, posts };
};