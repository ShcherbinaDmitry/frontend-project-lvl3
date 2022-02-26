import _ from 'lodash';
import loadFeed from './loadFeed.js';

const iter = (newVal, oldVal) => {
  if (newVal.pubDate.getTime() === oldVal.pubDate.getTime() && newVal.link === oldVal.link) {
    return true;
  }

  return false;
};

const loadPosts = (state) => {
  const { feeds, posts: oldPosts } = state;
  const feedPromises = feeds.map((feed) => loadFeed(feed));

  return Promise
    .all(feedPromises)
    .then((data) => data.forEach(({ feed, posts: updatedPosts }) => {
      const newPosts = _.differenceWith(updatedPosts, oldPosts, (a, b) => iter(a, b));

      const newPostsWithId = newPosts
        .map((post) => ({
          ...post,
          id: _.uniqueId(),
          feedId: feed.id,
        }));

      state.posts.push(...newPostsWithId);
    }));
};

const updatePosts = (state) => {
  const { updatePostsTimeout } = state;
  return setTimeout(() => {
    loadPosts(state).finally(() => updatePosts(state));
  }, updatePostsTimeout);
};

export default updatePosts;
